import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ThemeToggle from '../components/ThemeToggle';
import Footer from '../components/footer';

const MainLayout = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex bg-background dark:bg-dark-background text-gray-800 dark:text-white transition-colors duration-300">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <header className="h-16 px-6 flex items-center justify-between bg-indigo-100 dark:bg-gray-800 shadow-md sticky top-0 z-10">
          <ThemeToggle />
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>

        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
