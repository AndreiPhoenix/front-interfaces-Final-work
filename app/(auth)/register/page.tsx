'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { registerUser } from '@/lib/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPasswordRules, setShowPasswordRules] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    if (!agreeToTerms) {
      setError('Необходимо принять условия использования');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const result = registerUser(username, email, password);
      
      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(result.error || 'Ошибка регистрации');
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
              background: 'linear-gradient(135deg, #7c3aed, #db2777)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              color: 'white',
              fontSize: '28px',
            }}>
              ✨
            </div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827' }}>
              Создать аккаунт
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
              <label htmlFor="username">Имя пользователя</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError('');
                }}
                placeholder="Только буквы"
                required
              />
              <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>
                3-20 символов, только буквы
              </p>
            </div>

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
              />
            </div>

            <div>
              <label htmlFor="password">
                Пароль
                <button
                  type="button"
                  onClick={() => setShowPasswordRules(!showPasswordRules)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#4f46e5',
                    cursor: 'pointer',
                    fontSize: '13px',
                    marginLeft: '8px',
                    textDecoration: 'underline',
                  }}
                >
                  {showPasswordRules ? 'Скрыть правила' : 'Правила пароля'}
                </button>
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Придумайте пароль"
                required
              />
              
              {showPasswordRules && (
                <div style={{
                  background: '#f0f9ff',
                  border: '1px solid #bae6fd',
                  borderRadius: '8px',
                  padding: '12px',
                  marginTop: '8px',
                  fontSize: '13px',
                }}>
                  <p style={{ fontWeight: '600', marginBottom: '8px', color: '#0369a1' }}>
                    Пароль должен содержать:
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, color: '#374151' }}>
                    <li style={{ marginBottom: '4px' }}>
                      {password.length >= 6 ? '✅' : '❌'} Минимум 6 символов
                    </li>
                    <li style={{ marginBottom: '4px' }}>
                      {/[a-zA-Z]/.test(password) ? '✅' : '❌'} Хотя бы одну букву
                    </li>
                    <li>
                      {/[0-9]/.test(password) ? '✅' : '❌'} Хотя бы одну цифру
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword">Подтвердите пароль</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError('');
                }}
                placeholder="Повторите пароль"
                required
                style={confirmPassword && password !== confirmPassword ? { borderColor: '#dc2626' } : {}}
              />
              {confirmPassword && password !== confirmPassword && (
                <p style={{ fontSize: '12px', color: '#dc2626', marginTop: '4px' }}>
                  Пароли не совпадают
                </p>
              )}
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'start', gap: '10px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => {
                    setAgreeToTerms(e.target.checked);
                    setError('');
                  }}
                  style={{ width: '18px', height: '18px', marginTop: '2px' }}
                />
                <span style={{ fontSize: '14px', color: '#374151', lineHeight: '1.5' }}>
                  Я принимаю{' '}
                  <a href="#" style={{ color: '#4f46e5', textDecoration: 'underline' }} onClick={(e) => {
                    e.preventDefault();
                    alert('Условия использования:\n\n1. Не использовать платформу для спама\n2. Не загружать вредоносный контент\n3. Уважать других пользователей\n4. Соблюдать авторские права');
                  }}>
                    условия использования
                  </a>{' '}
                  и{' '}
                  <a href="#" style={{ color: '#4f46e5', textDecoration: 'underline' }} onClick={(e) => {
                    e.preventDefault();
                    alert('Политика конфиденциальности:\n\nВаши данные используются только для работы сервиса и не передаются третьим лицам.');
                  }}>
                    политику конфиденциальности
                  </a>
                </span>
              </label>
            </div>

            <button 
              type="submit" 
              className="btn-primary" 
              style={{ 
                width: '100%', 
                background: 'linear-gradient(135deg, #7c3aed, #db2777)',
                opacity: loading ? 0.7 : 1,
              }}
              disabled={loading}
            >
              {loading ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '24px', color: '#6b7280', fontSize: '15px' }}>
            Уже есть аккаунт?{' '}
            <Link href="/login" style={{ color: '#7c3aed', fontWeight: '600', textDecoration: 'none' }}>
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}