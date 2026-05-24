import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Мастерская Промпт-Инжиниринга
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Изучайте современные техники создания промптов, создавайте шаблоны 
            и делитесь ими с сообществом
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/learn"
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Начать обучение
            </Link>
            <Link
              href="/templates"
              className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
            >
              Смотреть шаблоны
            </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="text-4xl font-bold text-indigo-600">50+</div>
            <div className="text-gray-600 mt-2">Техник промптов</div>
          </div>
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="text-4xl font-bold text-purple-600">1000+</div>
            <div className="text-gray-600 mt-2">Шаблонов создано</div>
          </div>
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="text-4xl font-bold text-pink-600">500+</div>
            <div className="text-gray-600 mt-2">Пользователей</div>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Возможности платформы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow p-8">
              <h3 className="text-xl font-semibold mb-3">Интерактивное обучение</h3>
              <p className="text-gray-600">Пошаговые уроки с практическими заданиями</p>
            </div>
            <div className="bg-white rounded-lg shadow p-8">
              <h3 className="text-xl font-semibold mb-3">Редактор шаблонов</h3>
              <p className="text-gray-600">Создавайте промпты с подсветкой синтаксиса</p>
            </div>
            <div className="bg-white rounded-lg shadow p-8">
              <h3 className="text-xl font-semibold mb-3">Сообщество</h3>
              <p className="text-gray-600">Делитесь шаблонами и учитесь у других</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}