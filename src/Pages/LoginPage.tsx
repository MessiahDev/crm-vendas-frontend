import React from 'react';
import { LoginForm } from '../components/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-2xl mb-6 text-center font-semibold">Login</h2>
      <LoginForm />
    </div>
  );
};

export default LoginPage;