import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { userService } from '../services/UserService';
import ThemeToggle from '../components/ThemeToggle';
import Footer from '../components/footer';

function ResetPasswordPage() {
   const navigate = useNavigate();
   const [password, setPassword] = useState('');
   const [confirm, setConfirm] = useState('');
   const [message, setMessage] = useState('');
   const [error, setError] = useState('');
   const [token, setToken] = useState('');

   const [searchParams] = useSearchParams();

   useEffect(() => {
      const t = searchParams.get('token');
      if (t) setToken(t);
      else setError('Token de redefinição ausente ou inválido.');
   }, [searchParams]);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setMessage('');
      setError('');

      if (password !== confirm) {
         setError('As senhas não coincidem');
         return;
      }

      if (!token) {
         setError('Token inválido.');
         return;
      }

      try {
         await userService.resetPassword(token, password);
         setMessage('Senha redefinida com sucesso. Você já pode fazer login.');
      } catch {
         setError('Erro ao redefinir a senha. Token inválido ou expirado.');
      }
   };

   return (
      <div className="min-h-screen flex flex-col justify-between bg-gray-100 dark:bg-dark-background transition-colors duration-300">
         <div className="flex-grow flex items-center justify-center">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
               <ThemeToggle />
               <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Criar nova senha</h2>
               <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nova senha</label>
                     <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirmar senha</label>
                     <input
                        type="password"
                        required
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                     />
                  </div>
                  {message && <p className="text-green-600 dark:text-green-400 text-sm">{message}</p>}
                  {error && <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>}
                  <button
                     type="submit"
                     className="w-full py-2 bg-primary dark:bg-secondary hover:bg-dark-primary dark:hover:bg-dark-secondary text-white font-semibold rounded-lg transition-colors duration-300"
                  >
                     Redefinir senha
                  </button>
                  <button
                     type="button"
                     onClick={() => navigate('/forgot-password')}
                     className="w-full py-2 mt-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg"
                  >
                     Voltar
                  </button>
               </form>
            </div>
         </div>
         <Footer />
      </div>
   );
}

export default ResetPasswordPage;
