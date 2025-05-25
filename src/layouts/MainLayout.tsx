import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ThemeToggle from '../components/ThemeToggle';

const MainLayout = () => {

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="h-16 px-6 flex items-center justify-between bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
          <h1 className="text-lg font-bold">CRM Dashboard</h1>
          <ThemeToggle />
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
