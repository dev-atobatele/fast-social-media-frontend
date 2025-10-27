// src/hooks/useAuth.js
import { useState } from 'react';

export default function useAuth() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  return { token, login, logout, isLoggedIn: !!token };
}
