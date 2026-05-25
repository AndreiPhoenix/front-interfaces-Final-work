'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateTemplatePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('custom');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Шаблон создан!');
    router.push('/dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Создание шаблона</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Название шаблона *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Например: Анализ тональности текста"
            required
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Описание
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            placeholder="Опишите, что делает ваш промпт..."
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Категория
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="custom">Свой стиль</option>
            <option value="chain-of-thought">Цепочка рассуждений</option>
            <option value="few-shot">Few-Shot</option>
            <option value="zero-shot">Zero-Shot</option>
            <option value="role-playing">Ролевая игра</option>
            <option value="structured-output">Структурированный вывод</option>
          </select>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Содержание промпта *
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm"
            placeholder={`## Роль
Ты - эксперт по анализу данных

## Задача
Проанализируй текст: {{text}}

## Формат ответа
Выведи результат в JSON`}
            required
          />
        </div>

        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md font-semibold hover:bg-gray-50"
          >
            Отмена
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700"
          >
            Создать шаблон
          </button>
        </div>
      </form>
    </div>
  );
}