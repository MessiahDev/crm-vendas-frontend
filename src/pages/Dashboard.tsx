import { useEffect, useState } from 'react';
import ThemeToggle from '../components/ThemeToggle';

export default function DashboardPage() {
  const [user, setUser] = useState({ name: 'Alex' });

  useEffect(() => {
    setUser({ name: 'Alex' });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-dark-background text-gray-800 dark:text-white transition-colors duration-300">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow-md">
        <h1 className="text-xl font-bold">CRM Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="hidden sm:block">Olá, {user.name}</span>
          <ThemeToggle />
        </div>
      </header>

      <main className="p-6 grid gap-6 md:grid-cols-3">
        <div className="p-4 rounded-xl shadow-md bg-white dark:bg-gray-800">
          <h2 className="text-lg font-semibold mb-2">Clientes</h2>
          <p className="text-3xl font-bold">24</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">novos este mês</p>
        </div>

        <div className="p-4 rounded-xl shadow-md bg-white dark:bg-gray-800">
          <h2 className="text-lg font-semibold mb-2">Vendas</h2>
          <p className="text-3xl font-bold">R$ 12.400</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">últimos 30 dias</p>
        </div>

        <div className="p-4 rounded-xl shadow-md bg-white dark:bg-gray-800">
          <h2 className="text-lg font-semibold mb-2">Negócios em andamento</h2>
          <p className="text-3xl font-bold">8</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">no funil</p>
        </div>
      </main>
    </div>
  );
}
