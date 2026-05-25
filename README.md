# 🚀 PromptHub - Мастерская Промпт-Инжиниринга

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green)

Платформа для изучения современных техник промпт-инжиниринга, создания шаблонов и обмена ими с сообществом.

## ✨ Возможности

- 📚 **Обучение** - интерактивные уроки по 6 техникам промпт-инжиниринга
- 🎨 **Шаблоны** - галерея готовых решений от сообщества
- ✏️ **Редактор промптов** - создание шаблонов с подсветкой синтаксиса
- 👤 **Личный кабинет** - управление своими шаблонами
- 🔐 **Аутентификация** - регистрация и вход в систему
- ♿ **Доступность** - поддержка скринридеров и клавиатурной навигации

## 🎯 Подсветка синтаксиса

Поддерживаемые элементы промптов:

| Элемент | Пример | Тип |
|---------|--------|-----|
| Заголовки | `## Heading` | `heading` |
| Разделители | `—` | `separator` |
| Стрелки | `→` | `arrow` |
| XML-теги | `<tag>` | `xml-tag` |
| Переменные | `{{var}}` | `variable` |
| Акценты | `CAPS` | `accent` |
| MetaGlyph | `∈ ∩ ∪` | `metaglyph` |
| Инлайн-код | `` `code` `` | `inline-code` |
| JSON | `"key": "value"` | `json` |
| Декораторы | `+++Format` | `decorator` |

## 🛠 Технологический стек

### Frontend
- **Next.js 14** - React фреймворк с SSR
- **TypeScript** - типизация
- **Tailwind CSS** - стилизация
- **Jest** - unit-тестирование
- **Playwright** - e2e тестирование

### Инструменты
- **ESLint** - линтер
- **Prettier** - форматирование
- **Bundle Analyzer** - анализ размера бандла
- **Lighthouse** - аудит производительности

## 📦 Установка и запуск

### Требования
- Node.js 18+
- npm 9+

### Установка

```bash
# Клонирование репозитория
git clone https://github.com/your-username/prompthub.git
cd prompthub

# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev
