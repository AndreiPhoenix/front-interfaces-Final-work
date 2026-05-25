import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/navigation/Navbar';

export const metadata: Metadata = {
  title: 'PromptHub',
  description: 'Платформа для изучения промпт-инжиниринга',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <Navbar />
        <main style={{ minHeight: 'calc(100vh - 120px)' }}>
          {children}
        </main>
        <footer style={{ 
          backgroundColor: '#1f2937', 
          color: 'white', 
          padding: '24px', 
          textAlign: 'center',
          fontSize: '14px'
        }}>
          © 2026 PromptHub. Все права защищены.
        </footer>
      </body>
    </html>
  );
}