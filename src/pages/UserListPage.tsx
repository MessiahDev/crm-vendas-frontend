import { useEffect, useState } from 'react';
import { userService } from '../services/UserService';
import type { User } from '../models/User';
import { Link } from 'react-router-dom';
import ConfirmDelete from '../components/ConfirmDelete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrashCan } from '@fortawesome/free-regular-svg-icons';

const useAuth = () => {
  const [role, setRole] = useState<number>(0);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const userData = await userService.validateToken();
        setRole(userData.role);
      } catch (error) {
        console.error('Erro ao validar token:', error);
      }
    };

    fetchRole();
  }, []);

  return { role };
};

const UserListPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const { role } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userService.getAll();
        setUsers(data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const permission = role === 1 || role === 3;

  const handleDelete = async () => {
    if (!userToDelete) return;

    try {
      await userService.delete(userToDelete.id);
      setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    } finally {
      setUserToDelete(null);
    }
  };

  return (
    <div className='min-h-screen p-6 text-gray-900 bg-background dark:bg-dark-background dark:text-white transition-colors duration-300'>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Usuários</h1>
          {permission && (
            <Link to="/usuarios/novo" className="px-4 py-2 bg-primary dark:bg-secondary text-white rounded hover:bg-dark-primary dark:hover:bg-dark-secondary transition duration-200">
              Novo Usuário
            </Link>
          )}
        </div>

        {loading ? (
          <p>Carregando...</p>
        ) : users.length === 0 ? (
          <p>Nenhum cliente cadastrado.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className='dark:bg-gray-800 bg-gray-200'>
                  <th className="p-3 text-left">Nome</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Ações</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className='dark:hover:bg-gray-800 hover:bg-gray-100'>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3 space-x-6">
                      <Link to={`/usuarios/${user.id}`} className="text-blue-500">
                        {permission ? <FontAwesomeIcon icon={faEdit} title='Editar' /> : <FontAwesomeIcon icon={faEye} title='Visualizar' />}
                      </Link>
                      {permission && (
                        <button
                          className="text-red-500"
                          onClick={() => setUserToDelete(user)}
                        >
                          <FontAwesomeIcon icon={faTrashCan} title='Excluir' />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ConfirmDelete
        isOpen={userToDelete !== null}
        onClose={() => setUserToDelete(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default UserListPage;
