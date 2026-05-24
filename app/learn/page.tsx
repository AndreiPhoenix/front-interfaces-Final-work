export default function LearnPage() {
  const lessons = [
    { title: 'Chain of Thought', description: 'Пошаговое рассуждение для сложных задач', level: 'Начинающий', duration: '15 мин' },
    { title: 'Few-Shot обучение', description: 'Использование примеров в промптах', level: 'Средний', duration: '20 мин' },
    { title: 'Zero-Shot техники', description: 'Промпты без примеров', level: 'Начинающий', duration: '10 мин' },
    { title: 'Ролевые промпты', description: 'Создание персонажей и контекста', level: 'Средний', duration: '25 мин' },
    { title: 'Структурированный вывод', description: 'JSON, XML и другие форматы', level: 'Продвинутый', duration: '30 мин' },
    { title: 'Мета-промпты', description: 'Промпты для создания промптов', level: 'Эксперт', duration: '45 мин' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Обучение промпт-инжинирингу</h1>
        <p className="text-gray-600 mb-12">Выберите технику и начните обучение</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <div key={lesson.title} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{lesson.title}</h3>
              <p className="text-gray-600 mb-4">{lesson.description}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{lesson.level}</span>
                <span>{lesson.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}