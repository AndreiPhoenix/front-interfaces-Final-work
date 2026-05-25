'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getUserTemplates, deleteTemplate } from '@/lib/templates';
import { getCurrentUser } from '@/lib/auth';

export default function DashboardPage() {
  const [userTemplates, setUserTemplates] = useState<any[]>([]);
  const user = getCurrentUser();

  useEffect(() => {
    if (user) {
      setUserTemplates(getUserTemplates(user.email));
    }
  }, [user]);

  const handleDelete = (id: string) => {
    if (confirm('Удалить шаблон?')) {
      deleteTemplate(id);
      if (user) {
        setUserTemplates(getUserTemplates(user.email));
      }
    }
  };

  if (!user) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 16px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '28px', color: '#111827', marginBottom: '16px' }}>
          Необходимо войти в систему
        </h1>
        <a href="/login" className="btn-primary" style={{ textDecoration: 'none' }}>
          Войти
        </a>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 16px' }}>
      <div style={{ marginBottom: '48px' }}>
        <h1 style={{ fontSize: '42px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
          Мой кабинет
        </h1>
        <p style={{ fontSize: '20px', color: '#6b7280' }}>
          Добро пожаловать, {user.username}!
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px', marginBottom: '48px' }}>
        <Link href="/templates/create" className="card" style={{ textDecoration: 'none', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '4px',
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
          }}></div>
          <div style={{
            width: '56px',
            height: '56px',
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '24px',
            marginBottom: '16px',
          }}>
            +
          </div>
          <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
            Создать шаблон
          </h3>
          <p style={{ color: '#6b7280', fontSize: '16px' }}>
            Новый промпт-шаблон
          </p>
        </Link>

        <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '4px',
            background: 'linear-gradient(135deg, #059669, #10b981)',
          }}></div>
          <div style={{
            width: '56px',
            height: '56px',
            background: 'linear-gradient(135deg, #059669, #10b981)',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '24px',
            marginBottom: '16px',
          }}>
            📝
          </div>
          <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
            Мои шаблоны
          </h3>
          <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#059669', margin: '8px 0' }}>
            {userTemplates.length}
          </p>
          <p style={{ color: '#6b7280', fontSize: '16px' }}>созданных шаблонов</p>
        </div>

        <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '4px',
            background: 'linear-gradient(135deg, #ea580c, #ef4444)',
          }}></div>
          <div style={{
            width: '56px',
            height: '56px',
            background: 'linear-gradient(135deg, #ea580c, #ef4444)',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '24px',
            marginBottom: '16px',
          }}>
            ⭐
          </div>
          <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
            Избранное
          </h3>
          <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#ea580c', margin: '8px 0' }}>0</p>
          <p style={{ color: '#6b7280', fontSize: '16px' }}>сохраненных шаблонов</p>
        </div>
      </div>

      {/* Список шаблонов пользователя */}
      <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>
        Мои шаблоны
      </h2>
      
      {userTemplates.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
          <p style={{ fontSize: '18px' }}>У вас пока нет созданных шаблонов</p>
          <Link href="/templates/create" className="btn-primary" style={{ display: 'inline-block', marginTop: '16px', textDecoration: 'none' }}>
            Создать первый шаблон
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
          {userTemplates.map((template, index) => (
            <div key={template.id} className="card" style={{ position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '4px',
                background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              }}></div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                {template.title}
              </h3>
              <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '12px' }}>
                {template.description || 'Без описания'}
              </p>
              <pre style={{
                background: '#f9fafb',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '13px',
                color: '#374151',
                maxHeight: '100px',
                overflow: 'hidden',
                marginBottom: '12px',
              }}>
                {template.content}
              </pre>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#9ca3af', fontSize: '13px' }}>{template.createdAt}</span>
                <button
                  onClick={() => handleDelete(template.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ef4444',
                    cursor: 'pointer',
                    fontSize: '14px',
                    padding: '4px 12px',
                    borderRadius: '6px',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#fef2f2'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  🗑 Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}