'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getCurrentUser, logoutUser } from '@/lib/auth';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    setUser(getCurrentUser());
  }, [pathname]);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    setShowUserMenu(false);
    router.push('/');
  };

  const links = [
    { href: '/', label: 'Главная', icon: '🏠' },
    { href: '/learn', label: 'Обучение', icon: '📚' },
    { href: '/templates', label: 'Шаблоны', icon: '🎨' },
  ];

  if (user) {
    links.push({ href: '/dashboard', label: 'Кабинет', icon: '👤' });
  }

  return (
    <nav style={{
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          height: '64px',
        }}>
          <Link href="/" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            textDecoration: 'none',
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '18px',
              boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
            }}>
              P
            </div>
            <span style={{
              fontSize: '22px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              PromptHub
            </span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: pathname === link.href ? '600' : '500',
                  color: pathname === link.href ? '#4f46e5' : '#6b7280',
                  background: pathname === link.href ? '#eef2ff' : 'transparent',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (pathname !== link.href) {
                    e.currentTarget.style.background = '#f3f4f6';
                  }
                }}
                onMouseLeave={(e) => {
                  if (pathname !== link.href) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {link.icon} {link.label}
              </Link>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {user ? (
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    background: '#eef2ff',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#4f46e5',
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 'bold',
                  }}>
                    {user.username[0].toUpperCase()}
                  </div>
                  {user.username}
                  <span style={{ fontSize: '12px' }}>▼</span>
                </button>

                {showUserMenu && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '8px',
                    background: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    border: '1px solid rgba(0,0,0,0.05)',
                    padding: '8px',
                    minWidth: '180px',
                  }}>
                    <div style={{ padding: '12px', borderBottom: '1px solid #f3f4f6' }}>
                      <p style={{ fontWeight: '600', color: '#111827', fontSize: '14px' }}>
                        {user.username}
                      </p>
                      <p style={{ color: '#6b7280', fontSize: '12px', marginTop: '2px' }}>
                        {user.email}
                      </p>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setShowUserMenu(false)}
                      style={{
                        display: 'block',
                        padding: '10px 12px',
                        color: '#374151',
                        textDecoration: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      👤 Мой кабинет
                    </Link>
                    <button
                      onClick={handleLogout}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        background: 'none',
                        border: 'none',
                        color: '#dc2626',
                        cursor: 'pointer',
                        borderRadius: '8px',
                        fontSize: '14px',
                        textAlign: 'left',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#fef2f2'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      🚪 Выйти
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  style={{
                    padding: '8px 20px',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    fontSize: '15px',
                    fontWeight: '500',
                    color: '#4f46e5',
                  }}
                >
                  Войти
                </Link>
                <Link
                  href="/register"
                  style={{
                    padding: '10px 24px',
                    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    fontSize: '15px',
                    fontWeight: '600',
                    color: 'white',
                    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
                  }}
                >
                  Регистрация
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}