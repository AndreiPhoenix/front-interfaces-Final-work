import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navigation/Navbar';
import { SkipLink } from '@/components/accessibility/SkipLink';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'PromptHub - Мастерская промпт-инжиниринга',
  description: 'Изучайте, создавайте и делитесь промптами',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={`${inter.className} antialiased`}>
        <SkipLink />
        <Navbar />
        <main id="main-content">
          {children}
        </main>
        <footer className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">PromptHub</h3>
                <p className="text-gray-400">Мастерская промпт-инжиниринга для разработчиков и исследователей AI.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Навигация</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="/learn" className="hover:text-white transition-colors">Обучение</a></li>
                  <li><a href="/templates" className="hover:text-white transition-colors">Шаблоны</a></li>
                  <li><a href="/dashboard" className="hover:text-white transition-colors">Кабинет</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Контакты</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Email: hello@prompthub.ru</li>
                  <li>Telegram: @prompthub</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>© 2026 PromptHub. Все права защищены.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}