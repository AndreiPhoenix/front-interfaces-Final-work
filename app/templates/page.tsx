import Link from 'next/link';

export default function TemplatesPage() {
  const templates = [
    { title: 'Анализ текста', category: 'Chain of Thought', author: 'Анна К.', likes: 234 },
    { title: 'Генерация кода', category: 'Few-Shot', author: 'Михаил Д.', likes: 189 },
    { title: 'Перевод с контекстом', category: 'Role Playing', author: 'Елена С.', likes: 156 },
    { title: 'Суммаризация текста', category: 'Zero-Shot', author: 'Дмитрий В.', likes: 142 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Шаблоны промптов</h1>
          <p className="text-gray-600">Готовые решения от сообщества</p>
        </div>
        <Link
          href="/templates/create"
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
        >
          + Создать шаблон
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template) => (
          <div key={template.title} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{template.title}</h3>
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                {template.category}
              </span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Автор: {template.author}</span>
              <span>❤️ {template.likes}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}