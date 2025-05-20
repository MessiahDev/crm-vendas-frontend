import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="font-bold text-xl">CRM Vendas</h1>
      <nav className="space-x-4">
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/clientes" className="hover:underline">Clientes</Link>
      </nav>
    </header>
  );
};

export default Header;