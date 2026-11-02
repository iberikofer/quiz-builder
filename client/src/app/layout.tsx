import type { Metadata, Viewport } from 'next';
import Header from '../components/Header';
import { StorageModeProvider } from '../context/StorageModeContext';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata: Metadata = {
  title: 'Quiz Builder | Build, Manage & Test Quizzes',
  description:
    'A modern full-stack Quiz Builder platform to create custom quizzes with various question types, test knowledge, and inspect question structures.',
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#2563eb',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-800 antialiased font-sans">
        <StorageModeProvider>
          <Toaster position="bottom-right" />
          <Header />
          <main className="mx-auto max-w-4xl px-4 py-5 sm:py-6">
            {children}
          </main>
        </StorageModeProvider>
      </body>
    </html>
  );
}

