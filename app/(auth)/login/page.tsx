'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginUser } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Имитация задержки запроса
    setTimeout(() => {
      const result = loginUser(email, password);
      
      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(result.error || 'Ошибка входа');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div style={{ 
      minHeight: '90vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{ maxWidth: '420px', width: '100%' }}>
        <div className="card" style={{ padding: '40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              color: 'white',
              fontSize: '28px',
            }}>
              👤
            </div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827' }}>
              Вход в аккаунт
            </h1>
          </div>

          {error && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              padding: '12px 16px',
              borderRadius: '10px',
              marginBottom: '20px',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span>⚠️</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="your@email.com"
                required
                style={error.includes('email') ? { borderColor: '#dc2626' } : {}}
              />
            </div>
            <div>
              <label htmlFor="password">Пароль</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Введите пароль"
                required
                style={error.includes('пароль') || error.includes('Пароль') ? { borderColor: '#dc2626' } : {}}
              />
            </div>
            <button 
              type="submit" 
              className="btn-primary" 
              style={{ width: '100%', opacity: loading ? 0.7 : 1 }}
              disabled={loading}
            >
              {loading ? 'Вход...' : 'Войти'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '24px', color: '#6b7280', fontSize: '15px' }}>
            Нет аккаунта?{' '}
            <Link href="/register" style={{ color: '#4f46e5', fontWeight: '600', textDecoration: 'none' }}>
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}