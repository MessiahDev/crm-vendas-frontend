import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LeadService } from '../services/LeadService';
import { userService } from '../services/UserService';
import { CustomerService } from '../services/CustomerService';
import type { Lead, CreateLead } from '../models/Lead';
import type { User } from '../models/User';
import type { Customer } from '../models/Customer';
import { LeadStatus } from '../models/enums/LeadStatus';
import { LeadSource } from '../models/enums/LeadSource';

const LeadFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  // formData adaptado ao modo (criação ou edição)
  const [formData, setFormData] = useState<Partial<Lead>>({
    name: '',
    email: '',
    phone: '',
    source: LeadSource.Other,
    status: LeadStatus.Novo,
    userId: 0,
    customerId: 0,
  });

  const [users, setUsers] = useState<User[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);

  // Carrega usuários e clientes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userList, customerList] = await Promise.all([
          userService.getAll(),
          CustomerService.getAll(),
        ]);
        setUsers(userList);
        setCustomers(customerList);
      } catch {
        toast.error('Erro ao carregar usuários ou clientes');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isEditMode) {
      setLoading(true);
      LeadService.getById(Number(id))
        .then((lead) => {
          setFormData({
            id: lead.id,
            name: lead.name,
            email: lead.email || '',
            phone: lead.phone || '',
            source: lead.source || '',
            status: lead.status,
            userId: lead.userId,
            customerId: lead.customerId,
          });
        })
        .catch(() => toast.error('Erro ao carregar lead'))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'status'
          ? Number(value)
          : name === 'userId' || name === 'customerId'
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditMode) {
        await LeadService.update(Number(id), formData as Lead);
        toast.success('Lead atualizado com sucesso!');
      } else {
        const { id, ...rest } = formData;
        const createPayload: CreateLead = {
          ...(rest as CreateLead),
        };

        await LeadService.create(createPayload);
        toast.success('Lead criado com sucesso!');
      }
      navigate('/leads');
    } catch {
      toast.error('Erro ao salvar lead.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        {isEditMode ? 'Editar Lead' : 'Novo Lead'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-200">Nome</label>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
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
            value={formData.email || ''}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-200">Telefone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-200">Origem</label>
          <select
            name="source"
            value={formData.source || ''}
            onChange={handleChange}
            required
            className="w-full mt-1 px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
          >
            {Object.entries(LeadStatus).map(([key, value]) => (
              <option key={value} value={value}>
                {key}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-200">Status</label>
          <select
            name="status"
            value={formData.status || ''}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
          >
            {Object.entries(LeadStatus).map(([key, value]) => (
              <option key={value} value={value}>
                {key}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-200">Usuário Responsável</label>
          <select
            name="userId"
            value={formData.userId || ''}
            onChange={handleChange}
            required
            className="w-full mt-1 px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
          >
            <option value="">Selecione um usuário</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-200">Cliente Relacionado</label>
          <select
            name="customerId"
            value={formData.customerId || ''}
            onChange={handleChange}
            required
            className="w-full mt-1 px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
          >
            <option value="">Selecione um cliente</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
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

export default LeadFormPage;
