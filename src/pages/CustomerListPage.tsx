import { useEffect, useState } from 'react';
import { userService } from '../services/UserService';
import type { User } from '../models/User';
import { Link } from 'react-router-dom';
import ConfirmDelete from '../components/ConfirmDelete';
import { toast } from 'react-toastify';
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { Customer } from '../models/Customer';
import { CustomerService } from '../services/CustomerService';

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
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { role } = useAuth();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [customerIdToDelete, setCustomerIdToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchUsers();
    fetchCustomers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await userService.getAll();
      setUsers(data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const data = await CustomerService.getAll();
      setCustomers(data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id: number) => {
    setCustomerIdToDelete(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (customerIdToDelete !== null) {
      try {
        await CustomerService.delete(customerIdToDelete);
        toast.success('Cliente excluído com sucesso!');
        await fetchCustomers();
      } catch {
        toast.error('Erro ao excluir o cliente.');
      } finally {
        setConfirmOpen(false);
        setCustomerIdToDelete(null);
      }
    }
  };

  const permission = role === 1 || role === 3;

  const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    if (isNaN(date.getTime())) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className='min-h-screen p-6 dark:bg-gray-900 dark:text-white bg-gray-100 text-gray-900'>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Clientes</h1>
          {permission && (
            <Link to="/clientes/novo" className="px-4 py-2 bg-primary dark:bg-secondary text-white rounded hover:bg-dark-primary dark:hover:bg-dark-secondary transition duration-200">
              Novo Cliente
            </Link>
          )}
        </div>

        {loading ? (
          <p>Carregando...</p>
        ) : customers.length === 0 ? (
          <p>Nenhum cliente cadastrado.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className='dark:bg-gray-800 bg-gray-200'>
                  <th className="p-3 text-left">Nome</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Telefone</th>
                  <th className="p-3 text-left">Convertido em</th>
                  <th className="p-3 text-left">Responsável</th>
                  <th className="p-3 text-left">Ações</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className='dark:hover:bg-gray-800 hover:bg-gray-100'>
                    <td className="p-3">{customer.name}</td>
                    <td className="p-3">{customer.email}</td>
                    <td className="p-3">{customer.phone}</td>
                    <td className="p-3">{formatDate(customer.convertedAt)}</td>
                    <td className="p-3">{customer.user.name}</td>
                    <td className="p-3 space-x-6">
                      <Link to={`/clientes/${customer.id}`} className="text-blue-500">
                        <FontAwesomeIcon icon={faEdit} title='Editar' />
                      </Link>
                      <button
                        className="text-red-500"
                        onClick={() => handleDeleteClick(customer.id)}
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

export default UserListPage;
