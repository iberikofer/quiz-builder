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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const popoverRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setIsPopoverOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isPopoverOpen || isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopoverOpen, isMobileMenuOpen]);

  // Close menus when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsPopoverOpen(false);
  }, [pathname]);

  const isDesktop = () =>
    typeof window !== 'undefined' && window.innerWidth >= 769;

  const handleMouseEnter = () => {
    if (isDesktop()) {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
      setIsPopoverOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (isDesktop()) {
      hoverTimeoutRef.current = setTimeout(() => {
        setIsPopoverOpen(false);
      }, 200);
    }
  };

  const handleBadgeClick = (e: React.MouseEvent) => {
    if (!isDesktop()) {
      e.preventDefault();
      setIsPopoverOpen((prev) => !prev);
    }
  };

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
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-md transition-all">
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

        {/* Right side controls: Offline Badge + Navigation / Mobile Burger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* 1. Offline / Online Status Badge (always to the left of nav / burger) */}
          <div
            className="relative"
            ref={popoverRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {isLocalMode ? (
              <button
                type="button"
                onClick={handleBadgeClick}
                className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50/90 px-2.5 py-1 text-xs font-semibold text-amber-800 shadow-sm transition-all hover:bg-amber-100 hover:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-1"
                title="Offline Mode — saved in browser storage"
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
                onClick={handleBadgeClick}
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800 transition-all hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-1"
                title="Online Mode — connected to cloud database"
                aria-expanded={isPopoverOpen}
              >
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span>Online</span>
              </button>
            )}

            {/* Mobile backdrop for popover modal */}
            {isPopoverOpen && (
              <div
                className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px] md:hidden"
                onClick={() => setIsPopoverOpen(false)}
                aria-hidden="true"
              />
            )}

            {/* Popover Card (English) */}
            {isPopoverOpen && (
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="fixed inset-x-3 top-16 z-50 rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-150 md:absolute md:inset-auto md:left-0 md:top-full md:mt-2 md:w-96"
              >
                <div className="flex items-start justify-between gap-2 border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-amber-700 text-xs font-bold shadow-sm">
                      {isLocalMode ? '🟡' : '🟢'}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">
                        {isLocalMode
                          ? 'Offline Mode (Local Storage)'
                          : 'Online Mode (Cloud)'}
                      </h4>
                      <p className="text-[11px] text-gray-500">
                        {isLocalMode
                          ? 'Saved directly in browser storage'
                          : 'Connected to PostgreSQL / Prisma'}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsPopoverOpen(false)}
                    className="rounded-md p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>

                <div className="py-3 text-xs leading-relaxed text-gray-600">
                  {isLocalMode ? (
                    <p className="rounded-xl border border-amber-200/80 bg-amber-50/90 p-3 leading-normal text-amber-900">
                      “The database is currently asleep or unreachable. All
                      quizzes are securely saved in your browser's local
                      storage. Full functionality to create, view, and pass
                      quizzes is maintained!”
                    </p>
                  ) : (
                    <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 leading-normal text-emerald-900">
                      Database is active. All quizzes are synced and stored
                      securely in the cloud database.
                    </p>
                  )}
                </div>

                {/* Local Stats */}
                <div className="mb-3 flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-3.5 py-2.5 text-xs text-gray-600">
                  <span className="font-medium">Quizzes in local storage:</span>
                  <span className="text-sm font-bold text-gray-900">
                    {localCount}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    disabled={isChecking}
                    onClick={handleReconnect}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-500 disabled:opacity-60"
                  >
                    {isChecking ? (
                      <>
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>Checking server connection...</span>
                      </>
                    ) : (
                      <>
                        <span>🔄</span>
                        <span>Check Database Connection</span>
                      </>
                    )}
                  </button>

                  {isLocalMode ? (
                    <button
                      type="button"
                      onClick={() => setLocalMode(false)}
                      className="py-0.5 text-center text-[11px] text-gray-500 underline hover:text-blue-600"
                    >
                      Force switch to Cloud Mode
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setLocalMode(true)}
                      className="py-0.5 text-center text-[11px] text-amber-700 underline hover:text-amber-900"
                    >
                      Switch to Offline Mode manually
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 2. Desktop Navigation Links (>= 769px) */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
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

          {/* 3. Mobile Hamburger Button (< 769px) */}
          <div className="relative md:hidden" ref={mobileMenuRef}>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>

            {/* Mobile Menu Backdrop */}
            {isMobileMenuOpen && (
              <div
                className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px] md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-hidden="true"
              />
            )}

            {/* Mobile Dropdown Menu */}
            {isMobileMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl border border-gray-200 bg-white p-2 shadow-2xl ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-150 z-50 md:hidden">
                <div className="flex flex-col gap-1">
                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                      pathname === '/'
                        ? 'bg-blue-50 text-blue-700 font-semibold'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <span>🏠</span>
                    <span>Home</span>
                  </Link>
                  <Link
                    href="/quizzes"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                      pathname === '/quizzes'
                        ? 'bg-blue-50 text-blue-700 font-semibold'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <span>📋</span>
                    <span>Quizzes</span>
                  </Link>
                  <Link
                    href="/create"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                      pathname === '/create'
                        ? 'bg-blue-50 text-blue-700 font-semibold'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <span>✨</span>
                    <span>Create Quiz</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
