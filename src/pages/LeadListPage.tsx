import { useEffect, useState } from 'react';
import type { Lead } from '../models/Lead';
import { LeadService } from '../services/LeadService';
import { Link } from 'react-router-dom';
import { LeadStatus } from '../models/enums/LeadStatus';
import ConfirmDelete from '../components/ConfirmDelete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';

const LeadListPage = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const data = await LeadService.getAll();
        setLeads(data);
      } catch (error) {
        console.error('Erro ao buscar leads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const handleDelete = async () => {
    if (!leadToDelete) return;

    try {
      await LeadService.delete(leadToDelete.id);
      setLeads((prev) => prev.filter((l) => l.id !== leadToDelete.id));
    } catch (error) {
      console.error('Erro ao excluir lead:', error);
    } finally {
      setLeadToDelete(null);
    }
  };

  const leadStatusLabel = (status: number) => {
    switch (status) {
      case LeadStatus.Novo:
        return 'Novo';
      case LeadStatus.Contactado:
        return 'Contato feito';
      case LeadStatus.Qualificado:
        return 'Qualificado';
      case LeadStatus.Perdido:
        return 'Perdido';
      case LeadStatus.Convertido:
        return 'Convertido';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <div className='p-6'>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Leads</h1>
          <Link to="/leads/novo" className="px-4 py-2 bg-primary dark:bg-secondary text-white rounded hover:bg-dark-primary dark:hover:bg-dark-secondary transition-colors duration-300">
            Novo Lead
          </Link>
        </div>

        {loading ? (
          <p>Carregando...</p>
        ) : leads.length === 0 ? (
          <p>Nenhum lead cadastrado.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className='dark:bg-gray-800 bg-gray-200'>
                  <th className="p-3 text-left">Nome</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Responsável</th>
                  <th className="p-3 text-left">Cliente</th>
                  <th className="p-3 text-left">Ações</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className='dark:hover:bg-gray-800 hover:bg-gray-100'>
                    <td className="p-3">{lead.name}</td>
                    <td className="p-3">{lead.email}</td>
                    <td className="p-3">{leadStatusLabel(lead.status)}</td>
                    <td className="p-3">{lead.userName ?? '-'}</td>
                    <td className="p-3">{lead.customerName ?? '-'}</td>
                    <td className="p-3 space-x-6">
                      <Link to={`/leads/${lead.id}`} className="text-blue-500">
                        <FontAwesomeIcon icon={faEdit} title='Editar' />
                      </Link>
                      <button
                        className="text-red-500"
                        onClick={() => setLeadToDelete(lead)}
                      >
                        <FontAwesomeIcon icon={faTrashCan} title='Excluir' />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ConfirmDelete
        isOpen={leadToDelete !== null}
        onClose={() => setLeadToDelete(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default LeadListPage;
