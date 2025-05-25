import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userService } from '../services/UserService';
import type { User, RegisterRequest, UpdateRequest } from '../models/User';
import { toast } from 'react-toastify';

const UserFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = !!id;
  const [formData, setFormData] = useState<RegisterRequest>({
    name: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      setLoading(true);
      userService
        .getById(Number(id!))
        .then((user: User) => {
          setFormData({ name: user.name, email: user.email, password: '' });
        })
        .catch(() => toast.error('Erro ao carregar usuário'))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditMode) {
        const updateData: UpdateRequest = {
          name: formData.name,
          email: formData.email,
          password: formData.password
        };
        await userService.update(Number(id!), updateData);
        toast.success('Usuário atualizado com sucesso!');
      } else {
        await userService.create(formData);
        toast.success('Usuário criado com sucesso!');
      }

      navigate('/usuarios');
    } catch {
      toast.error('Erro ao salvar usuário.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        {isEditMode ? 'Editar Usuário' : 'Novo Usuário'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-200">Nome</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full mt-1 px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-200">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full mt-1 px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-200">
            {isEditMode ? 'Nova Senha (opcional)' : 'Senha'}
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required={!isEditMode}
            className="w-full mt-1 px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
      </form>
    </div>
  );
};

export default UserFormPage;
