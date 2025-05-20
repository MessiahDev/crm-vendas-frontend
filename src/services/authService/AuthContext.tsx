import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import * as authService from './AuthService';

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(authService.getToken());

  useEffect(() => {
    if (token) {
      authService.saveToken(token);
    } else {
      authService.removeToken();
    }
  }, [token]);

  async function login(email: string, password: string): Promise<boolean> {
    const token = await authService.login(email, password);
    if (token) {
      setToken(token);
      return true;
    }
    return false;
  }

  function logout() {
    setToken(null);
  }

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
