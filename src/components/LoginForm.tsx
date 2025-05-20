import React, { useState } from 'react';
import { useAuth } from '../services/authService/AuthContext';

export function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
        const token = await login(email, password);

        if (!token || typeof token !== 'string') {
        throw new Error("Login inválido");
        }

        localStorage.setItem("token", token);
        alert("Login bem-sucedido!");

        // Lembrar de redirecionar depois de fazer login!!!
    } catch (error) {
        setError(`E-mail ou senha inválidos. ${error}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4">
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="border p-2 w-full mb-2"
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="border p-2 w-full mb-2"
        required
      />
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <button type="submit" className="bg-blue-600 text-white p-2 w-full">
        Entrar
      </button>
    </form>
  );
}
