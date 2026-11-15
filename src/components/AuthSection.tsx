import { useState } from 'react';
import { RegisterForm } from './RegisterForm';
import { LoginForm } from './LoginForm';
import { useGetCurrentUserQuery } from '../api/baseApi';

export function AuthSection() {
  const [tab, setTab] = useState<'register' | 'login'>('register');
  const { data: currentUser, isSuccess: isAuthenticated } = useGetCurrentUserQuery();

  return (
    <section className="auth-section">
      <div className="auth-card">
        {isAuthenticated && currentUser ? (
          <div className="auth-user-info">
            <p>
              Ви увійшли як: <strong>{currentUser.email}</strong>
            </p>
          </div>
        ) : null}

        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab-btn ${tab === 'register' ? 'active' : ''}`}
            onClick={() => setTab('register')}
          >
            Реєстрація
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${tab === 'login' ? 'active' : ''}`}
            onClick={() => setTab('login')}
          >
            Авторизація
          </button>
        </div>

        <div className="auth-form-container">
          {tab === 'register' ? (
            <RegisterForm onSuccess={() => setTab('login')} />
          ) : (
            <LoginForm />
          )}
        </div>
      </div>
    </section>
  );
}
