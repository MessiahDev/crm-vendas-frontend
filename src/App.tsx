import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import DashboardPage from './Pages/DashboardPage';
import ClientesPage from './Pages/ClientesPage';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/clientes" element={<ClientesPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;