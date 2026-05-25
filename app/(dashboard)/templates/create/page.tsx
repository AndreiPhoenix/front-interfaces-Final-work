'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createTemplate } from '@/lib/templates';
import { getCurrentUser } from '@/lib/auth';

export default function CreateTemplatePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('custom');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState('');

  const user = getCurrentUser();

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!user) {
      setError('Необходимо войти в систему');
      return;
    }

    if (title.length < 3) {
      setError('Название должно содержать минимум 3 символа');
      return;
    }

    if (content.length < 10) {
      setError('Содержание должно быть минимум 10 символов');
      return;
    }

    createTemplate({
      title,
      description,
      content,
      category,
      tags,
      author: user.username,
      authorEmail: user.email,
    });

    alert('Шаблон успешно создан!');
    router.push('/dashboard');
  };

  if (!user) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 16px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '28px', color: '#111827', marginBottom: '16px' }}>
          Необходимо войти в систему
        </h1>
        <p style={{ color: '#6b7280', marginBottom: '24px' }}>
          Для создания шаблонов нужно авторизоваться
        </p>
        <a href="/login" className="btn-primary" style={{ textDecoration: 'none' }}>
          Войти
        </a>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 16px' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '42px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
          Создание шаблона
        </h1>
        <p style={{ fontSize: '20px', color: '#6b7280' }}>
          Разработайте свой идеальный промпт
        </p>
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
        }}>
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="card" style={{ padding: '24px' }}>
          <label htmlFor="title">Название шаблона *</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Например: Анализ тональности текста"
            required
          />
        </div>

        <div className="card" style={{ padding: '24px' }}>
          <label htmlFor="description">Описание</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Опишите, что делает ваш промпт..."
            style={{ resize: 'vertical' }}
          />
        </div>

        <div className="card" style={{ padding: '24px' }}>
          <label htmlFor="category">Категория</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="custom">Свой стиль</option>
            <option value="chain-of-thought">Цепочка рассуждений</option>
            <option value="few-shot">Few-Shot обучение</option>
            <option value="zero-shot">Zero-Shot техники</option>
            <option value="role-playing">Ролевая игра</option>
            <option value="structured-output">Структурированный вывод</option>
          </select>
        </div>

        <div className="card" style={{ padding: '24px' }}>
          <label>Теги</label>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              placeholder="Добавить тег..."
            />
            <button
              type="button"
              onClick={addTag}
              className="btn-outline"
              style={{ padding: '8px 20px', whiteSpace: 'nowrap' }}
            >
              Добавить
            </button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '4px 12px',
                  background: '#eef2ff',
                  color: '#4f46e5',
                  borderRadius: '20px',
                  fontSize: '14px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#4f46e5',
                    fontSize: '16px',
                  }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: '24px' }}>
          <label htmlFor="content">Содержание промпта *</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
            placeholder={`## Роль\nТы - эксперт по анализу данных\n\n## Задача\nПроанализируй текст: {{text}}\n\n## Формат ответа\nВыведи результат в JSON`}
            style={{ 
              fontFamily: 'monospace', 
              fontSize: '14px',
              resize: 'vertical',
              background: '#f9fafb',
            }}
            required
          />
        </div>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={() => router.back()}
            className="btn-outline"
          >
            Отмена
          </button>
          <button type="submit" className="btn-primary">
            Создать шаблон
          </button>
        </div>
      </form>
    </div>
  );
}