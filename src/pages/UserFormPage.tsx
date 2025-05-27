import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userService } from '../services/UserService';
import type { User, RegisterRequest, UpdateRequest } from '../models/User';
import { toast } from 'react-toastify';
import { UserRole } from '../models/enums/UserRole';

const useAuth = () => {
  const [role, setRole] = useState<number>(0);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const userData = await userService.validateToken();
        setRole(userData.role);
      } catch (error) {
        console.error('Erro ao validar token:', error);
      }
    };

    fetchRole();
  }, []);

  return { role };
};

const UserFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { role } = useAuth();

  const isEditMode = !!id;
  const [formData, setFormData] = useState<RegisterRequest>({
    name: '',
    email: '',
    role: 0 as UserRole,
    password: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      setLoading(true);
      userService
        .getById(Number(id!))
        .then((user: User) => {
          setFormData({ name: user.name, email: user.email, role: user.role, password: '' });
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
          role: formData.role,
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

  const canEdit = role === 1 || role === 3;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">
        {(isEditMode ? `${canEdit ? 'Editar' : ''} Usuário` : `${canEdit ? 'Novo' : ''} Usuário`)}
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
            disabled={!canEdit}
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
            disabled={!canEdit}
            className="w-full mt-1 px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          {canEdit && (
            <>
              <label className="block text-sm text-gray-700 dark:text-gray-200">Perfil</label>
              <select
                name="role"
                value={formData.role === undefined || formData.role === null ? '' : formData.role}
                onChange={e => setFormData(prev => ({ ...prev, role: Number(e.target.value) as UserRole }))}
                required
                className="w-full mt-1 px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
              >
                <option value={0}>Selecione o perfil</option>
                <option value={1}>Administrador</option>
                <option value={2}>Usuário</option>
                <option value={3}>Desenvolvedor</option>
              </select>
            </>
          )}
        </div>

        <div>
          {canEdit && (
            <label className="block text-sm text-gray-700 dark:text-gray-200">
              {isEditMode ? 'Nova Senha (opcional)' : 'Senha'}
            </label>
          )}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required={!isEditMode}
            hidden={!canEdit}
            className="w-full mt-1 px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>
          <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('/usuarios')}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Voltar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded text-white bg-primary dark:bg-secondary hover:bg-dark-primary dark:hover:bg-dark-secondary"
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserFormPage;
