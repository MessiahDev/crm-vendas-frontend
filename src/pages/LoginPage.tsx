import { useState } from 'react';
import { useAuth } from '../services/ApiService/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import Footer from '../components/footer';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err) {
      setError('Email ou senha inválidos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-dark-background transition-colors duration-300">
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
          <ThemeToggle />
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
            Entrar na Conta
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary"
              />
            </div>

            {error && <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-primary dark:bg-secondary hover:bg-dark-primary dark:hover:bg-dark-secondary text-white font-semibold rounded-lg transition-colors duration-300"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>

            <div className="flex justify-between mt-4 text-sm">
              <Link to="/register" className="text-primary dark:text-secondary hover:underline dark:text-blue-400">
                Criar conta
              </Link>
              <Link to="/forgot-password" className="text-primary dark:text-secondary hover:underline dark:text-blue-400">
                Esqueci minha senha
              </Link>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default LoginPage;
