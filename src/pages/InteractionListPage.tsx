import { useEffect, useState } from 'react';
import type { Interaction } from '../models/Interaction';
import { InteractionService } from '../services/InteractionService';
import { Link } from 'react-router-dom';
import ConfirmDelete from '../components/ConfirmDelete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';

const InteractionListPage = () => {
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [interactionToDelete, setInteractionToDelete] = useState<Interaction | null>(null);

  useEffect(() => {
    const fetchInteractions = async () => {
      try {
        const data = await InteractionService.getAll();
        setInteractions(data);
      } catch (error) {
        console.error('Erro ao buscar interações:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInteractions();
  }, []);

  const handleDelete = async () => {
    if (!interactionToDelete) return;

    try {
      await InteractionService.delete(interactionToDelete.id);
      setInteractions((prev) =>
        prev.filter((i) => i.id !== interactionToDelete.id)
      );
    } catch (error) {
      console.error('Erro ao excluir interação:', error);
    } finally {
      setInteractionToDelete(null);
    }
  };

  return (
    <div className="min-h-screen p-6 text-gray-900 bg-background dark:bg-dark-background dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Interações</h1>
          <Link
            to="/interacoes/novo"
            className="px-4 py-2 bg-primary dark:bg-secondary text-white rounded hover:bg-dark-primary dark:hover:bg-dark-secondary transition duration-200"
          >
            Nova Interação
          </Link>
        </div>

        {loading ? (
          <p>Carregando...</p>
        ) : interactions.length === 0 ? (
          <p>Nenhuma interação cadastrada.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-800">
                  <th className="p-3 text-left">Tipo</th>
                  <th className="p-3 text-left">Notas</th>
                  <th className="p-3 text-left">Data</th>
                  <th className="p-3 text-left">Cliente</th>
                  <th className="p-3 text-left">Lead</th>
                  <th className="p-3 text-left">Ações</th>
                </tr>
              </thead>
              <tbody>
                {interactions.map((interaction) => (
                  <tr
                    key={interaction.id}
                    className="hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <td className="p-3">{interaction.type}</td>
                    <td className="p-3">{interaction.notes}</td>
                    <td className="p-3">
                      {new Date(interaction.date).toLocaleDateString()}
                    </td>
                    <td className="p-3">{interaction.customerName ?? '—'}</td>
                    <td className="p-3">{interaction.leadName ?? '—'}</td>
                    <td className="p-3 space-x-6">
                      <Link to={`/interacoes/${interaction.id}`} className="text-blue-500">
                        <FontAwesomeIcon icon={faEdit} title='Editar' />
                      </Link>
                      <button
                        className="text-red-500"
                        onClick={() => setInteractionToDelete(interaction)}
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
        isOpen={interactionToDelete !== null}
        onClose={() => setInteractionToDelete(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default InteractionListPage;
