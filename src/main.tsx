import React from 'react';
<script src="http://localhost:8097"></script>
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './services/authService/AuthContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);