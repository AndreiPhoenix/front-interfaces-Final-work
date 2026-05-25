import Link from 'next/link';

export default function LearnPage() {
  const lessons = [
    { title: 'Chain of Thought', desc: 'Пошаговое рассуждение', level: 'Начинающий', time: '15 мин', color: '#4f46e5' },
    { title: 'Few-Shot обучение', desc: 'Использование примеров', level: 'Средний', time: '20 мин', color: '#7c3aed' },
    { title: 'Zero-Shot техники', desc: 'Промпты без примеров', level: 'Начинающий', time: '10 мин', color: '#059669' },
    { title: 'Ролевые промпты', desc: 'Персонажи и контекст', level: 'Средний', time: '25 мин', color: '#db2777' },
    { title: 'Структурированный вывод', desc: 'JSON, XML форматы', level: 'Продвинутый', time: '30 мин', color: '#ea580c' },
    { title: 'Мета-промпты', desc: 'Промпты для промптов', level: 'Эксперт', time: '45 мин', color: '#dc2626' },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 16px' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ fontSize: '42px', fontWeight: 'bold', color: '#111827', marginBottom: '12px' }}>
          Обучение промпт-инжинирингу
        </h1>
        <p style={{ fontSize: '20px', color: '#6b7280' }}>
          Выберите технику и начните обучение
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
        {lessons.map((lesson) => (
          <div key={lesson.title} className="card" style={{ cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '4px',
              background: lesson.color,
            }}></div>
            <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
              {lesson.title}
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '20px', fontSize: '16px' }}>
              {lesson.desc}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{
                padding: '6px 16px',
                background: '#f3f4f6',
                borderRadius: '20px',
                fontSize: '14px',
                color: '#374151',
              }}>
                {lesson.level}
              </span>
              <span style={{ fontSize: '14px', color: '#9ca3af' }}>
                ⏱ {lesson.time}
              </span>
            </div>
            <button className="btn-primary" style={{ width: '100%', marginTop: '16px', padding: '10px', fontSize: '15px' }}>
              Начать урок
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}