import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CustomerService } from '../services/CustomerService';
import type { Customer } from '../models/Customer';
import { toast } from 'react-toastify';
import { userService } from '../services/UserService';

const CustomerFormPage = () => {
   const { id } = useParams();
   const navigate = useNavigate();

   const isEditMode = !!id;

   const [formData, setFormData] = useState<Customer>({
      id: 0,
      name: '',
      email: '',
      phone: '',
      convertedAt: new Date(),
      userId: 0,
      user: {
         id: 0,
         name: '',
         email: '',
         role: 2,
         password: '',
      },
   });

   const [loading, setLoading] = useState(false);

   useEffect(() => {
      const loadUser = async () => {
         try {
            const user = await userService.validateToken();
            setFormData((prev) => ({ ...prev, userId: user.id }));
         } catch {
            toast.error('Erro ao validar usuário.');
            navigate('/login');
         }
      };

      loadUser();
   }, []);

   useEffect(() => {
      if (isEditMode) {
         setLoading(true);
         CustomerService.getById(Number(id!))
            .then((customer: Customer) => {
               setFormData({
                  id: customer.id,
                  name: customer.name,
                  email: customer.email,
                  phone: customer.phone,
                  convertedAt: customer.convertedAt,
                  userId: customer.userId,
                  user: customer.user,
               });
            })
            .catch(() => toast.error('Erro ao carregar cliente'))
            .finally(() => setLoading(false));
      }
   }, [id]);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      try {
         if (isEditMode) {
            await CustomerService.update(Number(id!), formData);
            toast.success('Cliente atualizado com sucesso!');
         } else {
            await CustomerService.create(formData);
            toast.success('Cliente criado com sucesso!');
         }

         navigate('/clientes');
      } catch {
         toast.error('Erro ao salvar cliente.');
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow">
         <h1 className="text-2xl font-bold mb-6">
            {isEditMode ? 'Editar Cliente' : 'Novo Cliente'}
         </h1>

         <form onSubmit={handleSubmit} className="space-y-4">
            <div>
               <label className="block text-sm text-gray-700 dark:text-gray-200">Nome</label>
               <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
               />
            </div>

            <div>
               <label className="block text-sm text-gray-700 dark:text-gray-200">Email</label>
               <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
               />
            </div>

            <div>
               <label className="block text-sm text-gray-700 dark:text-gray-200">Telefone</label>
               <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
               />
            </div>
            <div className="flex items-center justify-between">
               <button
                  type="button"
                  onClick={() => navigate('/clientes')}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
               >
                  Voltar
               </button>
               <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded text-white bg-primary dark:bg-secondary hover:bg-dark-primary dark:hover:bg-dark-secondary"
               >
                  {loading ? 'Salvando...' : 'Salvar'}
               </button>
            </div>
         </form>
      </div>
   );
};

export default CustomerFormPage;
