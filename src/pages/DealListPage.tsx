import { useEffect, useState } from 'react';
import type { Deal } from '../models/Deal';
import { DealService } from '../services/DealService';
import { Link } from 'react-router-dom';

const DealListPage = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const data = await DealService.getAll();
        setDeals(data);
      } catch (error) {
        console.error('Erro ao buscar negócios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  return (
    <div className='min-h-screen p-6 dark:bg-gray-900 dark:text-white bg-gray-100 text-gray-900'>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Negócios</h1>
          <Link to="/deals/novo" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Novo Negócio
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
                  <th className="p-3 text-left">Valor</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Ações</th>
                </tr>
              </thead>
              <tbody>
                {deals.map((deal) => (
                  <tr key={deal.id} className='dark:hover:bg-gray-800 hover:bg-gray-100'>
                    <td className="p-3">{deal.title}</td>
                    <td className="p-3">R$ {deal.value.toFixed(2)}</td>
                    <td className="p-3">{deal.stage}</td>
                    <td className="p-3 space-x-2">
                      <Link to={`/deals/${deal.id}`} className="text-blue-500 hover:underline">
                        Editar
                      </Link>
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => console.log('Excluir', deal.id)}
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

export default DealListPage;
