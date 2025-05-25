import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DealService } from '../services/DealService';
import { CustomerService } from '../services/CustomerService';
import type { Deal } from '../models/Deal';
import type { Customer } from '../models/Customer';
import { toast } from 'react-toastify';
import { DealStage } from '../models/enums/DealStage';

const DealFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = !!id;

  const [formData, setFormData] = useState<Deal>({
    id: 0,
    title: '',
    value: 0,
    stage: DealStage.Novo,
    createdAt: new Date(),
    customerId: 0,
  });

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Carrega todos os clientes para o select
    CustomerService.getAll()
      .then(setCustomers)
      .catch(() => toast.error('Erro ao carregar clientes'));
  }, []);

  useEffect(() => {
    if (isEditMode) {
      setLoading(true);
      DealService.getById(Number(id!))
        .then((deal: Deal) => {
          setFormData({
            id: deal.id,
            title: deal.title,
            value: deal.value,
            stage: deal.stage,
            createdAt: deal.createdAt,
            customerId: deal.customerId
          });
        })
        .catch(() => toast.error('Erro ao carregar negociação'))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'stage' ? value as DealStage : name === 'value' || name === 'customerId' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditMode) {
        await DealService.update(Number(id!), formData);
        toast.success('Negociação atualizada com sucesso!');
      } else {
        await DealService.create(formData);
        toast.success('Negociação criada com sucesso!');
      }

      navigate('/negociacoes');
    } catch {
      toast.error('Erro ao salvar negociação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        {isEditMode ? 'Editar Negociação' : 'Nova Negociação'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-200">Título</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full mt-1 px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-200">Valor</label>
          <input
            type="number"
            name="value"
            value={formData.value}
            onChange={handleChange}
            required
            className="w-full mt-1 px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-200">Status</label>
          <select
            name="stage"
            value={formData.stage}
            onChange={handleChange}
            required
            className="w-full mt-1 px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
          >
            {Object.values(DealStage).map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-200">Cliente</label>
          <select
            name="customerId"
            value={formData.customerId ?? ''}
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

export default DealFormPage;
