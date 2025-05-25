import { useEffect, useState } from 'react';
import { userService } from '../services/UserService';
import type { User } from '../models/User';
import { Link } from 'react-router-dom';

const UserListPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className='min-h-screen p-6 dark:bg-gray-900 dark:text-white bg-gray-100 text-gray-900'>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Usuários</h1>
          <Link to="/usuarios/novo" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Novo Usuário
          </Link>
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
                    <td className="p-3 space-x-2">
                      <Link to={`/usuarios/${user.id}`} className="text-blue-500 hover:underline">
                        Editar
                      </Link>
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => console.log('Excluir', user.id)}
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

export default UserListPage;
