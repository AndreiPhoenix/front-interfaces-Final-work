import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 16px' }}>
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
          Мастерская Промпт-Инжиниринга
        </h1>
        <p style={{ fontSize: '20px', color: '#4b5563', maxWidth: '600px', margin: '0 auto 32px' }}>
          Изучайте современные техники создания промптов, создавайте шаблоны и делитесь ими
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link
            href="/learn"
            style={{
              padding: '12px 32px',
              backgroundColor: '#4f46e5',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
            }}
          >
            Начать обучение
          </Link>
          <Link
            href="/templates"
            style={{
              padding: '12px 32px',
              border: '2px solid #4f46e5',
              color: '#4f46e5',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
            }}
          >
            Смотреть шаблоны
          </Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '64px' }}>
        <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#4f46e5' }}>50+</div>
          <div style={{ color: '#6b7280' }}>Техник промптов</div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#7c3aed' }}>1000+</div>
          <div style={{ color: '#6b7280' }}>Шаблонов создано</div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#ec4899' }}>500+</div>
          <div style={{ color: '#6b7280' }}>Пользователей</div>
        </div>
      </div>

      <h2 style={{ fontSize: '30px', fontWeight: 'bold', textAlign: 'center', marginBottom: '48px' }}>
        Возможности платформы
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
        <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>Интерактивное обучение</h3>
          <p style={{ color: '#6b7280' }}>Пошаговые уроки с практическими заданиями</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>Редактор шаблонов</h3>
          <p style={{ color: '#6b7280' }}>Создавайте промпты с подсветкой синтаксиса</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>Сообщество</h3>
          <p style={{ color: '#6b7280' }}>Делитесь шаблонами и учитесь у других</p>
        </div>
      </div>
    </div>
  );
}