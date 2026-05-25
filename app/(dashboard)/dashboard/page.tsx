import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Мой кабинет</h1>
      <p className="text-gray-600 mb-8">Добро пожаловать в личный кабинет</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/templates/create"
          className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Создать шаблон</h3>
          <p className="text-gray-600">Новый промпт-шаблон</p>
        </Link>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Мои шаблоны</h3>
          <p className="text-3xl font-bold text-indigo-600">0</p>
          <p className="text-gray-600">созданных шаблонов</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Избранное</h3>
          <p className="text-3xl font-bold text-purple-600">0</p>
          <p className="text-gray-600">сохраненных шаблонов</p>
        </div>
      </div>
    </div>
  );
}