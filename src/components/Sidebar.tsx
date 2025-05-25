import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'block py-2 px-4 bg-blue-600 text-white rounded'
      : 'block py-2 px-4 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 rounded';

  return (
    <aside className="w-64 h-screen bg-white dark:bg-gray-800 shadow-lg flex flex-col justify-between p-4">
      {/* Menu superior */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">CRM</h2>
        <nav className="space-y-2">
          <NavLink to="/dashboard" className={linkStyle}>Dashboard</NavLink>
          <NavLink to="/clientes" className={linkStyle}>Clientes</NavLink>
          <NavLink to="/leads" className={linkStyle}>Leads</NavLink>
          <NavLink to="/negocios" className={linkStyle}>Negócios</NavLink>
          <NavLink to="/interacoes" className={linkStyle}>Interações</NavLink>
          <NavLink to="/usuarios" className={linkStyle}>Usuários</NavLink>
        </nav>
      </div>

      {/* Identificação do usuário */}
      <div className="mt-6 border-t border-gray-300 dark:border-gray-700 pt-4 flex items-center gap-4">
        <img
          src="https://i.pravatar.cc/100?img=3"
          alt="Foto do usuário"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-medium text-gray-800 dark:text-white">Alex Souza</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Administrador</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
