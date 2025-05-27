import { useState } from 'react';
import { userService } from '../services/UserService';
import { useNavigate } from 'react-router-dom';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setMessage('');
  setError('');
  try {
    const response = await userService.requestPasswordReset(email);
    if (response.token) {
      navigate(`/reset-password?token=${encodeURIComponent(response.token)}`);
    } else {
      setMessage('Você será redirecionado para redefinir sua senha.');
      navigate("/forgot-password/reset-password");
    }
  } catch {
    setError('Erro ao redefinir. Tente novamente.');
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-dark-background transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Recuperar Senha</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary" />
          </div>
          {message && <p className="text-green-600 dark:text-green-400 text-sm">{message}</p>}
          {error && <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>}
          <button type="submit" className="w-full py-2 bg-primary hover:bg-blue-700 dark:bg-dark-primary dark:hover:bg-blue-600 text-white font-semibold rounded-lg transition">
            Enviar link
          </button>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full py-2 mt-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition"
          >
            Voltar ao Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
