// src/pages/AuthPage.js
import React from 'react';
import LoginForm from '../components/LoginForm';
import useAuth from '../hooks/useAuth';

export default function AuthPage() {
  const { login, isLoggedIn } = useAuth();

  return (
    <div>
      {isLoggedIn ? <p>You’re logged in!</p> : <LoginForm onLogin={login} />}
    </div>
  );
}
