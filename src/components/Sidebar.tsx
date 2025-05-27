import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faSignOutAlt,
  faBars,
  faTachometerAlt,
  faUsers,
  faBullseye,
  faHandshake,
  faComments,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { userService } from '../services/UserService';
import type { User } from '../models/User';

const Sidebar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await userService.validateToken();
        setUser(userData);
      } catch (error) {
        console.error('Erro ao validar token:', error);
      }
    };

    fetchUser();
  }, []);

  const userName = user?.name.split(' ')[0] || 'Usuário';

  const getRoleName = (role: number): string => {
    switch (role) {
      case 1: return 'Administrador';
      case 2: return 'Usuário';
      case 3: return 'Desenvolvedor';
      default: return 'Desconhecido';
    }
  };

  const handleLogout = async () => {
    try {
      await userService.logout();
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    (isActive
      ? 'bg-primary text-white dark:bg-secondary'
      : 'text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700') +
    ' flex items-center gap-3 py-2 px-4 rounded transition';

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-white dark:bg-gray-800 flex flex-col justify-between p-4 z-40 transition-all duration-300 ${
        isExpanded ? 'w-64' : 'w-16 items-center'
      }`}
    >
      <div className="flex flex-col items-left w-full focus:outline-none focus:ring-0 active:outline-none border-none">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-790 text-left dark:text-gray-100 mb-6 px-1"
          title="Expandir / Retrair"
          style={{ outline: 'none', boxShadow: 'none', border: 'none' }}
        >
          <FontAwesomeIcon icon={faBars} className="text-2xl" />
        </button>

        {isExpanded ? (
          <>
            <h2 className="text-2xl font-bold mb-6">CRM</h2>
            <nav className="space-y-2 w-full">
              <NavLink to="/dashboard" className={linkStyle}>
                <FontAwesomeIcon icon={faTachometerAlt} />
                Dashboard
              </NavLink>
              <NavLink to="/clientes" className={linkStyle}>
                <FontAwesomeIcon icon={faUsers} />
                Clientes
              </NavLink>
              <NavLink to="/leads" className={linkStyle}>
                <FontAwesomeIcon icon={faBullseye} />
                Leads
              </NavLink>
              <NavLink to="/negocios" className={linkStyle}>
                <FontAwesomeIcon icon={faHandshake} />
                Negócios
              </NavLink>
              <NavLink to="/interacoes" className={linkStyle}>
                <FontAwesomeIcon icon={faComments} />
                Interações
              </NavLink>
              <NavLink to="/usuarios" className={linkStyle}>
                <FontAwesomeIcon icon={faUser} />
                Usuários
              </NavLink>
            </nav>
          </>
        ) : (
          <nav className="flex flex-col items-center gap-6 mt-4">
            <NavLink to="/dashboard" title="Dashboard" className={linkStyle}>
              <FontAwesomeIcon icon={faTachometerAlt} />
            </NavLink>
            <NavLink to="/clientes" title="Clientes" className={linkStyle}>
              <FontAwesomeIcon icon={faUsers} />
            </NavLink>
            <NavLink to="/leads" title="Leads" className={linkStyle}>
              <FontAwesomeIcon icon={faBullseye} />
            </NavLink>
            <NavLink to="/negocios" title="Negócios" className={linkStyle}>
              <FontAwesomeIcon icon={faHandshake} />
            </NavLink>
            <NavLink to="/interacoes" title="Interações" className={linkStyle}>
              <FontAwesomeIcon icon={faComments} />
            </NavLink>
            <NavLink to="/usuarios" title="Usuários" className={linkStyle}>
              <FontAwesomeIcon icon={faUser} />
            </NavLink>
          </nav>
        )}
      </div>

      <div className={`border-t border-gray-300 dark:border-gray-700 pt-4 h-16 w-full ${isExpanded ? 'flex items-center justify-between' : 'flex flex-col items-center gap-4'}`}>
        {isExpanded ? (
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faUser} className="text-primary dark:text-secondary" />
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-white">
                {userName || 'Carregando...'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {getRoleName(user?.role || 0)}
              </p>
            </div>
          </div>
        ) : (
          <FontAwesomeIcon icon={faUser} className="text-xl text-gray-700 dark:text-white" title={userName} />
        )}

        <button
          onClick={handleLogout}
          title="Sair"
          className="text-red-500 hover:text-red-700 transition"
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="text-xl" />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
