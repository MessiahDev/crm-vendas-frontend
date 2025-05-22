import { useEffect, useState } from 'react';
import type { Lead } from '../models/Lead';
import { LeadService } from '../services/LeadService';
import { Link } from 'react-router-dom';

const LeadListPage = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className='min-h-screen p-6 dark:bg-gray-900 dark:text-white bg-gray-100 text-gray-900'>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Leads</h1>
          <Link to="/leads/novo" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Novo Lead
          </Link>
        </div>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className='dark:bg-gray-800 bg-gray-200'>
                  <th className="p-3 text-left">Nome</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Ações</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className='dark:hover:bg-gray-800 hover:bg-gray-100'>
                    <td className="p-3">{lead.name}</td>
                    <td className="p-3">{lead.email}</td>
                    <td className="p-3">{lead.status}</td>
                    <td className="p-3 space-x-2">
                      <Link to={`/leads/${lead.id}`} className="text-blue-500 hover:underline">
                        Editar
                      </Link>
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => console.log('Excluir', lead.id)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadListPage;
