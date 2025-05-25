import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CustomerService } from '../services/CustomerService';
import type { Customer, CustomerRequest } from '../models/Customer';
import { toast } from 'react-toastify';
import { userService } from '../services/UserService';

const CustomerFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = !!id;

  const [formData, setFormData] = useState<CustomerRequest>({
    name: '',
    email: '',
    phone: '',
    convertedAt: new Date(),
    userId: 0,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await userService.validateToken();
        setFormData((prev) => ({ ...prev, userId: user.id }));
      } catch {
        toast.error('Erro ao validar usuário.');
        navigate('/login');
      }
    };

    loadUser();
  }, []);

  useEffect(() => {
    if (isEditMode) {
      setLoading(true);
      CustomerService.getById(Number(id!))
        .then((customer: Customer) => {
          setFormData({
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            convertedAt: customer.convertedAt,
            userId: customer.userId,
          });
        })
        .catch(() => toast.error('Erro ao carregar cliente'))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditMode) {
        await CustomerService.update(Number(id!), formData);
        toast.success('Cliente atualizado com sucesso!');
      } else {
        await CustomerService.create(formData);
        toast.success('Cliente criado com sucesso!');
      }

      navigate('/clientes');
    } catch {
      toast.error('Erro ao salvar cliente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        {isEditMode ? 'Editar Cliente' : 'Novo Cliente'}
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
          <label className="block text-sm text-gray-700 dark:text-gray-200">Telefone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
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

export default CustomerFormPage;
