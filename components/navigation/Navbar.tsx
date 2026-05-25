'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Главная' },
    { href: '/learn', label: 'Обучение' },
    { href: '/templates', label: 'Шаблоны' },
    { href: '/dashboard', label: 'Кабинет' },
  ];

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold text-indigo-600">
              PromptHub
            </Link>
            <div className="flex gap-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm ${
                    pathname === link.href
                      ? 'text-indigo-600 font-semibold'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">
              Войти
            </Link>
            <Link
              href="/register"
              className="text-sm bg-indigo-600 text-white px-4 py-1.5 rounded hover:bg-indigo-700"
            >
              Регистрация
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}