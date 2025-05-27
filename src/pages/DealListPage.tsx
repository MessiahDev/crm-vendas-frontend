import { useEffect, useState } from 'react';
import type { Deal } from '../models/Deal';
import { DealService } from '../services/DealService';
import { Link } from 'react-router-dom';
import { DealStage } from '../models/enums/DealStage';
import ConfirmDelete from '../components/ConfirmDelete';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';

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

const DealListPage = () => {
   const [deals, setDeals] = useState<Deal[]>([]);
   const [loading, setLoading] = useState(true);

   const [confirmOpen, setConfirmOpen] = useState(false);
   const [dealIdToDelete, setDealIdToDelete] = useState<number | null>(null);

   useEffect(() => {
      fetchDeals();
   }, []);

   const fetchDeals = async () => {
      try {
         const data = await DealService.getAll();
         console.log('Negócios recebidos:', data);
         setDeals(data);
      } catch (error) {
         console.error('Erro ao buscar negócios:', error);
      } finally {
         setLoading(false);
      }
   };

   const handleDeleteClick = (id: number) => {
      setDealIdToDelete(id);
      setConfirmOpen(true);
   };

   const handleConfirmDelete = async () => {
      if (dealIdToDelete !== null) {
         try {
            await DealService.delete(dealIdToDelete);
            toast.success('Negócio excluído com sucesso!');
            await fetchDeals();
         } catch (error) {
            toast.error('Erro ao excluir o negócio.');
         } finally {
            setConfirmOpen(false);
            setDealIdToDelete(null);
         }
      }
   };

   return (
      <div className='p-6'>
         <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
               <h1 className="text-2xl font-bold">Negócios</h1>
               <Link to="/negocios/novo" className="px-4 py-2 bg-primary dark:bg-secondary text-white rounded hover:bg-dark-primary dark:hover:bg-dark-secondary transition-colors duration-300">
                  Novo Negócio
               </Link>
            </div>

            {loading ? (
               <p>Carregando...</p>
            ) : deals.length === 0 ? (
               <p>Nenhum negócio cadastrado.</p>
            ) : (
               <div className="overflow-x-auto">
                  <table className="w-full table-auto border-collapse">
                     <thead>
                        <tr className='dark:bg-gray-800 bg-gray-200'>
                           <th className="p-3 text-left">Título</th>
                           <th className="p-3 text-left">Valor</th>
                           <th className="p-3 text-left">Status</th>
                           <th className="p-3 text-left">Cliente</th>
                           <th className="p-3 text-left">Lead</th>
                           <th className="p-3 text-left">Ações</th>
                        </tr>
                     </thead>
                     <tbody>
                        {deals.map((deal) => (
                           <tr key={deal.id} className='dark:hover:bg-gray-800 hover:bg-gray-100'>
                              <td className="p-3">{deal.title}</td>
                              <td className="p-3">{deal.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                              <td className="p-3">{getStageLabel(deal.stage)}</td>
                              <td className="p-3">{deal.customer?.name ?? '—'}</td>
                              <td className="p-3">{deal.Lead?.name ?? '—'}</td>
                              <td className="p-3 space-x-6">
                                 <Link to={`/negocios/${deal.id}`} className="text-blue-500">
                                    <FontAwesomeIcon icon={faEdit} title='Editar' />
                                 </Link>
                                 <button
                                    className="text-red-500"
                                    onClick={() => handleDeleteClick(deal.id)}
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
            isOpen={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            onConfirm={handleConfirmDelete}
         />
      </div>
   );
};

export default DealListPage;
