import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ThemeToggle from '../components/ThemeToggle';

const MainLayout = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex bg-background dark:bg-dark-background text-gray-800 dark:text-white transition-colors duration-300">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <header className="h-16 px-6 flex items-center justify-between bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
          <ThemeToggle />
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>

        <footer className="h-20 px-4 py-2 bg-white dark:bg-gray-800 border-t dark:border-gray-700 text-center text-sm flex flex-col items-center justify-center">
          <p className="mb-1">
            Desenvolvido por{' '}
            <a
              href="https://www.linkedin.com/in/alex-alle/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary dark:text-secondary hover:underline"
            >
              Alex Alle
            </a>
          </p>
          <span>© {currentYear} CRM App. Todos os direitos reservados.</span>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
