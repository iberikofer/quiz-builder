'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ClipboardCheckIcon } from '../assets/svg';
import { useStorageMode } from '../context/StorageModeContext';

function Header() {
  const pathname = usePathname();
  const {
    isLocalMode,
    isChecking,
    localCount,
    checkBackendHealth,
    setLocalMode,
  } = useStorageMode();

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close popover on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsPopoverOpen(false);
      }
    };

    if (isPopoverOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopoverOpen]);

  const linkClass = (href: string, exact = false) => {
    const isActive = exact ? pathname === href : pathname.startsWith(href);
    return `rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all ${
      isActive
        ? 'bg-blue-50 text-blue-700 font-semibold'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`;
  };

  const handleReconnect = async () => {
    await checkBackendHealth();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm transition-transform group-hover:scale-105">
            <ClipboardCheckIcon className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            Quiz Builder
          </span>
        </Link>

        {/* Navigation & Status Badge */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Status Badge to the left of navigation links */}
          <div className="relative" ref={popoverRef}>
            {isLocalMode ? (
              <button
                type="button"
                onClick={() => setIsPopoverOpen((prev) => !prev)}
                className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50/90 px-2.5 py-1 text-xs font-semibold text-amber-800 shadow-sm transition-all hover:bg-amber-100 hover:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-1"
                title="Натисніть для деталей про роботу в офлайн режимі"
                aria-expanded={isPopoverOpen}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
                </span>
                <span>Offline</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsPopoverOpen((prev) => !prev)}
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800 transition-all hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-1"
                title="Підключено до хмарної бази даних"
                aria-expanded={isPopoverOpen}
              >
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span>Online</span>
              </button>
            )}

            {/* Popover Card */}
            {isPopoverOpen && (
              <div className="fixed inset-x-4 top-16 sm:absolute sm:inset-auto sm:left-0 sm:top-full mt-2 w-auto sm:w-96 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-150 z-50">
                <div className="flex items-start justify-between gap-2 border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-amber-600 text-xs font-bold">
                      {isLocalMode ? '🟡' : '🟢'}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">
                        {isLocalMode ? 'Офлайн режим (Offline)' : 'Онлайн режим (Online)'}
                      </h4>
                      <p className="text-[11px] text-gray-500">
                        {isLocalMode ? "Збереження в пам'ять браузера" : 'Підключено до PostgreSQL / Prisma'}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsPopoverOpen(false)}
                    className="text-gray-400 hover:text-gray-600 p-0.5 rounded-md hover:bg-gray-100"
                    aria-label="Закрити"
                  >
                    ✕
                  </button>
                </div>

                <div className="py-3 text-xs leading-relaxed text-gray-600">
                  {isLocalMode ? (
                    <p className="rounded-xl bg-amber-50/80 p-3 border border-amber-200/60 text-amber-900">
                      «База даних зараз спить або недоступна. Усі тести зберігаються локально у вашому браузері. Функціонал створення та проходження тестів повністю збережено!»
                    </p>
                  ) : (
                    <p className="rounded-xl bg-emerald-50 p-3 border border-emerald-200 text-emerald-900">
                      База даних активна. Усі нові та існуючі тести синхронізуються з хмарним сервером.
                    </p>
                  )}
                </div>

                {/* Local Stats */}
                <div className="mb-3 flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-600">
                  <span className="font-medium">Тестів у локальній пам'яті:</span>
                  <span className="font-bold text-gray-900">{localCount}</span>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    disabled={isChecking}
                    onClick={handleReconnect}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-500 disabled:opacity-60"
                  >
                    {isChecking ? (
                      <>
                        <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>Перевірка з'єднання з сервером...</span>
                      </>
                    ) : (
                      <>
                        <span>🔄</span>
                        <span>Перевірити з'єднання з базою даних</span>
                      </>
                    )}
                  </button>

                  {isLocalMode ? (
                    <button
                      type="button"
                      onClick={() => setLocalMode(false)}
                      className="text-[11px] text-gray-500 hover:text-blue-600 underline text-center"
                    >
                      Спробувати увімкнути онлайн-режим примусово
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setLocalMode(true)}
                      className="text-[11px] text-amber-700 hover:text-amber-900 underline text-center"
                    >
                      Перемкнути на офлайн-режим вручну
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          <nav className="flex items-center gap-1 sm:gap-2">
            <Link href="/" className={linkClass('/', true)}>
              Home
            </Link>
            <Link href="/quizzes" className={linkClass('/quizzes', true)}>
              Quizzes
            </Link>
            <Link href="/create" className={linkClass('/create', false)}>
              Create Quiz
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
