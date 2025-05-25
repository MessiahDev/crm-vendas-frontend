import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import CustomerListPage from './pages/CustomerListPage';
import CustomerFormPage from './pages/CustomerFormPage';
import LeadListPage from './pages/LeadListPage';
import LeadFormPage from './pages/LeadFormPage';
import InteractionListPage from './pages/InteractionListPage';
import InteractionFormPage from './pages/InteractionFormPage';
import DealListPage from './pages/DealListPage';
import DealFormPage from './pages/DealFormPage';
import UserListPage from './pages/UserListPage';
import UserFormPage from './pages/UserFormPage';
import MainLayout from './layouts/MainLayout';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import RegisterPage from './pages/RegisterPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Clientes */}
            <Route path="/clientes" element={<CustomerListPage />} />
            <Route path="/clientes/novo" element={<CustomerFormPage />} />
            <Route path="/clientes/:id" element={<CustomerFormPage />} />

            {/* Leads */}
            <Route path="/leads" element={<LeadListPage />} />
            <Route path="/leads/novo" element={<LeadFormPage />} />
            <Route path="/leads/:id" element={<LeadFormPage />} />

            {/* Negócios */}
            <Route path="/negocios" element={<DealListPage />} />
            <Route path="/negocios/novo" element={<DealFormPage />} />
            <Route path="/negocios/:id" element={<DealFormPage />} />

            {/* Interações */}
            <Route path="/interacoes" element={<InteractionListPage />} />
            <Route path="/interacoes/novo" element={<InteractionFormPage />} />
            <Route path="/interacoes/:id" element={<InteractionFormPage />} />

            {/* Usuários */}
            <Route path="/usuarios" element={<UserListPage />} />
            <Route path="/usuarios/novo" element={<UserFormPage />} />
            <Route path="/usuarios/:id" element={<UserFormPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
