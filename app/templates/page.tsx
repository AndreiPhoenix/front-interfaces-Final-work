'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllTemplates, likeTemplate } from '@/lib/templates';

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<any[]>([]);

  useEffect(() => {
    setTemplates(getAllTemplates());
  }, []);

  const handleLike = (id: string) => {
    likeTemplate(id);
    setTemplates(getAllTemplates());
  };

  const categoryNames: Record<string, string> = {
    'custom': 'Свой стиль',
    'chain-of-thought': 'Цепочка рассуждений',
    'few-shot': 'Few-Shot',
    'zero-shot': 'Zero-Shot',
    'role-playing': 'Ролевая игра',
    'structured-output': 'Структурированный вывод',
  };

  const colors = ['#4f46e5', '#7c3aed', '#059669', '#db2777', '#ea580c', '#dc2626'];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
        <div>
          <h1 style={{ fontSize: '42px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
            Шаблоны промптов
          </h1>
          <p style={{ fontSize: '20px', color: '#6b7280' }}>
            Готовые решения от сообщества ({templates.length})
          </p>
        </div>
        <Link href="/templates/create" className="btn-primary" style={{ fontSize: '16px' }}>
          + Создать шаблон
        </Link>
      </div>

      {templates.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#6b7280' }}>
          <p style={{ fontSize: '48px', marginBottom: '16px' }}>📝</p>
          <p style={{ fontSize: '20px' }}>Пока нет шаблонов</p>
          <p style={{ marginTop: '8px' }}>Создайте первый шаблон!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
          {templates.map((template, index) => (
            <div key={template.id} className="card" style={{ cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '4px',
                background: colors[index % colors.length],
              }}></div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#111827' }}>
                  {template.title}
                </h3>
              </div>
              
              <p style={{ color: '#6b7280', fontSize: '15px', marginBottom: '16px', lineHeight: '1.5' }}>
                {template.description || 'Описание отсутствует'}
              </p>
              
              <span style={{
                display: 'inline-block',
                padding: '6px 16px',
                background: '#eef2ff',
                color: colors[index % colors.length],
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '16px',
              }}>
                {categoryNames[template.category] || template.category}
              </span>
              
              {template.tags && template.tags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                  {template.tags.map((tag: string) => (
                    <span key={tag} style={{
                      padding: '2px 10px',
                      background: '#f3f4f6',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: '#6b7280',
                    }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    background: colors[index % colors.length],
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '14px',
                  }}>
                    {template.author[0]}
                  </div>
                  <div>
                    <span style={{ color: '#374151', fontSize: '15px', fontWeight: '500' }}>
                      {template.author}
                    </span>
                    <p style={{ color: '#9ca3af', fontSize: '12px' }}>{template.createdAt}</p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(template.id);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#ef4444',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '8px',
                    borderRadius: '8px',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#fef2f2'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  ❤️ {template.likes}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}