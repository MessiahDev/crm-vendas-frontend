const API_URL = 'http://localhost:5000'; // Ajustar depois

interface LoginResponse {
  token: string;
}

export async function login(email: string, password: string): Promise<string | null> {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) return null;

  const data: LoginResponse = await res.json();
  return data.token;
}

export function saveToken(token: string) {
  localStorage.setItem('token', token);
}

export function getToken(): string | null {
  return localStorage.getItem('token');
}

export function removeToken() {
  localStorage.removeItem('token');
}