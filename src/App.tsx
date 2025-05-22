import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import CustomerListPage from './pages/CustomerListPage';
import LeadListPage from './pages/LeadListPage';
import InteractionListPage from './pages/InteractionListPage';
import DealListPage from './pages/DealListPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customer" element={<CustomerListPage />} />
          <Route path="/lead" element={<LeadListPage />} />
          <Route path="/interaction" element={<InteractionListPage />} />
          <Route path="/deal" element={<DealListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

