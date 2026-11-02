import type { Metadata, Viewport } from 'next';
import Header from '../components/Header';
import { StorageModeProvider } from '../context/StorageModeContext';
import { ThemeProvider } from '../context/ThemeContext';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata: Metadata = {
  title: 'Quiz Builder | Build, Manage & Test Quizzes',
  description:
    'A modern full-stack Quiz Builder platform to create custom quizzes with various question types, test knowledge, and inspect question structures.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#0fa37f',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('quiz_builder_theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-screen bg-gray-50 text-gray-800 antialiased font-sans transition-colors dark:bg-gray-950 dark:text-gray-100">
        <ThemeProvider>
          <StorageModeProvider>
            <Toaster position="bottom-right" />
            <Header />
            <main className="mx-auto max-w-4xl px-4 py-5 sm:py-6">
              {children}
            </main>
          </StorageModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
