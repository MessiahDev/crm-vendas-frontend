import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CustomerService } from "../services/CustomerService";
import type { Customer } from "../models/Customer";

const CustomerListPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await CustomerService.getAll();
        setCustomers(data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className='min-h-screen p-6 dark:bg-gray-900 dark:text-white bg-gray-100 text-gray-800'>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Clientes</h1>
          <Link
            to="/customers/new"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Novo Cliente
          </Link>
        </div>

        {loading ? (
          <p>Carregando...</p>
        ) : customers.length === 0 ? (
          <p>Nenhum cliente cadastrado.</p>
        ) : (
          <div className="overflow-auto rounded-lg shadow">
            <table className="min-w-full bg-white dark:bg-gray-800">
              <thead>
                <tr>
                  <th className="py-3 px-6 text-left font-medium">Nome</th>
                  <th className="py-3 px-6 text-left font-medium">Email</th>
                  <th className="py-3 px-6 text-left font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer: any) => (
                  <tr key={customer.id} className="border-t">
                    <td className="py-3 px-6">{customer.name}</td>
                    <td className="py-3 px-6">{customer.email}</td>
                    <td className="py-3 px-6">
                      <Link
                        to={`/customers/${customer.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Ver / Editar
                      </Link>
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

export default CustomerListPage;
