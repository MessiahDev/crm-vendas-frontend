import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { InteractionService } from '../services/InteractionService';
import { CustomerService } from '../services/CustomerService';
import { LeadService } from '../services/LeadService';
import type { Interaction } from '../models/Interaction';
import type { Customer } from '../models/Customer';
import type { Lead } from '../models/Lead';
import { toast } from 'react-toastify';

const InteractionFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState<Interaction>({
    id: 0,
    type: '',
    notes: '',
    date: new Date(),
    leadId: 0,
    customerId: 0,
  });

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
      InteractionService.getById(Number(id!))
        .then((interaction: Interaction) => {
          setFormData({
            id: interaction.id,
            type: interaction.type,
            notes: interaction.notes || '',
            date: new Date(interaction.date),
            leadId: interaction.leadId || 0,
            customerId: interaction.customerId || 0,
          });
        })
        .catch(() => toast.error('Erro ao carregar interação'))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ['leadId', 'customerId'].includes(name) ? Number(value) : value,
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      date: new Date(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.customerId || !formData.leadId) {
        toast.error('Cliente e Lead são obrigatórios.');
        setLoading(false);
        return;
      }

      if (isEditMode) {
        await InteractionService.update(Number(id!), formData);
        toast.success('Interação atualizada com sucesso!');
      } else {
        await InteractionService.create(formData);
        toast.success('Interação criada com sucesso!');
      }

      navigate('/interacoes');
    } catch {
      toast.error('Erro ao salvar interação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        {isEditMode ? 'Editar Interação' : 'Nova Interação'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-200">Tipo</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full mt-1 px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-200">Notas</label>
          <textarea
            name="notes"
            value={formData.notes ?? ''}
            onChange={handleChange}
            rows={4}
            className="w-full mt-1 px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-200">Data</label>
          <input
            type="date"
            name="date"
            value={new Date(formData.date).toISOString().split('T')[0]}
            onChange={handleDateChange}
            required
            className="w-full mt-1 px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
          />
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
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
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

export default InteractionFormPage;
