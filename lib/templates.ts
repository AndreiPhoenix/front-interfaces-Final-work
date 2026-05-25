interface Template {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  authorEmail: string;
  likes: number;
  createdAt: string;
}

// Загружаем шаблоны из localStorage
const getTemplates = (): Template[] => {
  if (typeof window === 'undefined') return [];
  const templates = localStorage.getItem('templates');
  return templates ? JSON.parse(templates) : [];
};

// Сохраняем шаблоны в localStorage
const saveTemplates = (templates: Template[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('templates', JSON.stringify(templates));
};

// Начальные шаблоны
const initialTemplates: Template[] = [
  {
    id: '1',
    title: 'Анализ текста',
    description: 'Шаблон для анализа тональности текста',
    content: '## Роль\nТы - эксперт по анализу текста\n\n## Задача\nПроанализируй тональность: {{text}}\n\n## Формат\nВыведи результат в JSON',
    category: 'chain-of-thought',
    tags: ['анализ', 'текст'],
    author: 'Анна К.',
    authorEmail: 'anna@example.com',
    likes: 234,
    createdAt: '2026-01-15',
  },
  {
    id: '2',
    title: 'Генерация кода',
    description: 'Создание функций на Python',
    content: '## Роль\nТы - senior разработчик\n\n## Задача\nНапиши функцию: {{description}}\n\n## Требования\nИспользуй аннотации типов',
    category: 'few-shot',
    tags: ['код', 'python'],
    author: 'Михаил Д.',
    authorEmail: 'mikhail@example.com',
    likes: 189,
    createdAt: '2026-02-20',
  },
  {
    id: '3',
    title: 'Перевод с контекстом',
    description: 'Перевод текста с сохранением стиля',
    content: '## Контекст\nТы - профессиональный переводчик\n\n## Задача\nПереведи на {{language}}: {{text}}\n\n## Стиль\nСохрани формальный стиль',
    category: 'role-playing',
    tags: ['перевод', 'языки'],
    author: 'Елена С.',
    authorEmail: 'elena@example.com',
    likes: 156,
    createdAt: '2026-03-10',
  },
];

// Инициализация начальных шаблонов
const initTemplates = () => {
  if (typeof window === 'undefined') return;
  if (!localStorage.getItem('templates')) {
    saveTemplates(initialTemplates);
  }
};

// Создание нового шаблона
export const createTemplate = (template: Omit<Template, 'id' | 'likes' | 'createdAt'>) => {
  initTemplates();
  const templates = getTemplates();
  
  const newTemplate: Template = {
    ...template,
    id: Date.now().toString(),
    likes: 0,
    createdAt: new Date().toISOString().split('T')[0],
  };
  
  templates.unshift(newTemplate);
  saveTemplates(templates);
  
  return { success: true, template: newTemplate };
};

// Получить все шаблоны
export const getAllTemplates = (): Template[] => {
  initTemplates();
  return getTemplates();
};

// Получить шаблоны пользователя
export const getUserTemplates = (userEmail: string): Template[] => {
  initTemplates();
  return getTemplates().filter(t => t.authorEmail === userEmail);
};

// Получить шаблон по ID
export const getTemplateById = (id: string): Template | undefined => {
  return getTemplates().find(t => t.id === id);
};

// Удалить шаблон
export const deleteTemplate = (id: string) => {
  const templates = getTemplates().filter(t => t.id !== id);
  saveTemplates(templates);
};

// Лайкнуть шаблон
export const likeTemplate = (id: string) => {
  const templates = getTemplates();
  const template = templates.find(t => t.id === id);
  if (template) {
    template.likes += 1;
    saveTemplates(templates);
  }
};