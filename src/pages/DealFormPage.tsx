import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DealService } from '../services/DealService';
import { CustomerService } from '../services/CustomerService';
import { toast } from 'react-toastify';
import { DealStage } from '../models/enums/DealStage';
import { LeadService } from '../services/LeadService';
import type { Deal } from '../models/Deal';
import type { Customer } from '../models/Customer';
import type { Lead } from '../models/Lead';

const getStageLabel = (stage: DealStage): string => {
  switch (stage) {
    case DealStage.Novo:
      return 'Novo';
    case DealStage.Negociacao:
      return 'Em negociação';
    case DealStage.PropostaEnviada:
      return 'Proposta enviada';
    case DealStage.FechadoGanho:
      return 'Fechado (Ganho)';
    case DealStage.FechadoPerdido:
      return 'Fechado (Perdido)';
    default:
      return 'Desconhecido';
  }
};

const formatCurrency = (value: string): string => {
  const onlyNumbers = value.replace(/\D/g, '');
  const number = parseFloat(onlyNumbers) / 100;

  if (isNaN(number)) return '';

  return number.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

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
    leadId: 0,
  });

  const [formattedValue, setFormattedValue] = useState('');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    CustomerService.getAll()
      .then(setCustomers)
      .catch(() => toast.error('Erro ao carregar clientes'));

    LeadService.getAll()
      .then(setLeads)
      .catch(() => toast.error('Erro ao carregar leads'));
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
            createdAt: new Date(deal.createdAt),
            customerId: deal.customerId,
            leadId: deal.leadId,
          });
          setFormattedValue(deal.value.toFixed(2).replace('.', '')); // ex: "123456" para R$ 1.234,56
        })
        .catch(() => toast.error('Erro ao carregar negociação'))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'value') {
      const onlyNumbers = value.replace(/\D/g, '');
      const numberValue = parseFloat(onlyNumbers) / 100;

      setFormattedValue(value);
      setFormData((prev) => ({
        ...prev,
        value: isNaN(numberValue) ? 0 : numberValue,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: ['stage', 'customerId', 'leadId'].includes(name)
        ? Number(value)
        : value,
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

      navigate('/negocios');
    } catch {
      toast.error('Erro ao salvar negociação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">
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
            type="text"
            name="value"
            value={formatCurrency(formattedValue || formData.value.toString())}
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
            {Object.values(DealStage)
              .filter((v) => !isNaN(Number(v)))
              .map((stage) => (
                <option key={stage} value={stage}>
                  {getStageLabel(stage as DealStage)}
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

        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-200">Lead</label>
          <select
            name="leadId"
            value={formData.leadId ?? ''}
            onChange={handleChange}
            required
            className="w-full mt-1 px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
          >
            <option value="">Selecione um lead</option>
            {leads.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('/negocios')}
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

export default DealFormPage;
