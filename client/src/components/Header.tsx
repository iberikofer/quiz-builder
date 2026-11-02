'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ClipboardCheckIcon } from '../assets/svg';
import { useStorageMode } from '../context/StorageModeContext';
import ThemeSlider from './ThemeSlider';

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
  const [headerHeight, setHeaderHeight] = useState(57);

  const headerRef = useRef<HTMLElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Measure header height for precise backdrop positioning below the header
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

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
    e.preventDefault();
    e.stopPropagation();
    setIsPopoverOpen((prev) => !prev);
  };

  const linkClass = (href: string, exact = false) => {
    const isActive = exact ? pathname === href : pathname.startsWith(href);
    return `rounded-md px-3.5 py-1.5 text-sm font-medium transition-all ${
      isActive
        ? 'bg-mint-50 text-mint-700 font-semibold dark:bg-mint-950/60 dark:text-mint-400'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
    }`;
  };

  const handleReconnect = async () => {
    await checkBackendHealth();
  };

  // Reusable popover content card
  const renderPopoverContent = (align: 'top' | 'bottom') => (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`absolute ${
        align === 'bottom'
          ? 'bottom-full right-0 mb-3 animate-in fade-in slide-in-from-bottom-2'
          : 'top-full right-0 mt-2 animate-in fade-in zoom-in-95'
      } z-50 w-[calc(100vw-2rem)] max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow-2xl ring-1 ring-black/5 duration-150 dark:border-gray-800 dark:bg-gray-900`}
    >
      <div className="flex items-start justify-between gap-2 border-b border-gray-100 pb-3 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-100 text-amber-700 text-xs font-bold shadow-sm dark:bg-amber-950/80 dark:text-amber-400">
            {isLocalMode ? '🟡' : '🟢'}
          </span>
          <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">
              {isLocalMode
                ? 'Offline Mode (Local Storage)'
                : 'Online Mode (Cloud)'}
            </h4>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              {isLocalMode
                ? 'Saved directly in browser storage'
                : 'Connected to PostgreSQL / Prisma'}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsPopoverOpen(false)}
          className="rounded-md p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-200"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      <div className="py-3 text-xs leading-relaxed text-gray-600 dark:text-gray-300">
        {isLocalMode ? (
          <p className="rounded-md border border-amber-200/80 bg-amber-50/90 p-3 leading-normal text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200">
            “The database is currently asleep or unreachable. All
            quizzes are securely saved in your browser's local
            storage. Full functionality to create, view, and pass
            quizzes is maintained!”
          </p>
        ) : (
          <p className="rounded-md border border-emerald-200 bg-emerald-50 p-3 leading-normal text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-200">
            Database is active. All quizzes are synced and stored
            securely in the cloud database.
          </p>
        )}
      </div>

      {/* Local Stats */}
      <div className="mb-3 flex items-center justify-between rounded-md border border-gray-100 bg-gray-50 px-3.5 py-2.5 text-xs text-gray-600 dark:border-gray-800 dark:bg-gray-800/60 dark:text-gray-300">
        <span className="font-medium">Quizzes in local storage:</span>
        <span className="text-sm font-bold text-gray-900 dark:text-white">
          {localCount}
        </span>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2">
        <button
          type="button"
          disabled={isChecking}
          onClick={handleReconnect}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-mint-600 px-3 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-mint-700 disabled:opacity-60 dark:bg-mint-600 dark:hover:bg-mint-500"
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
            className="py-0.5 text-center text-[11px] text-gray-500 underline hover:text-mint-600 dark:text-gray-400 dark:hover:text-mint-400"
          >
            Force switch to Cloud Mode
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setLocalMode(true)}
            className="py-0.5 text-center text-[11px] text-amber-700 underline hover:text-amber-900 dark:text-amber-400 dark:hover:text-amber-300"
          >
            Switch to Offline Mode manually
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 z-50 border-b border-gray-200 bg-white transition-colors dark:border-gray-800 dark:bg-gray-900"
      >
        <div className="mx-auto flex max-w-4xl items-center justify-between px-3 py-2.5 sm:px-4 sm:py-3">
          {/* Brand Logo with 2-line break on screens < 375px */}
          <Link href="/" className="group flex items-center gap-2 sm:gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-mint-600 text-white shadow-sm transition-transform group-hover:scale-105 dark:bg-mint-500">
              <ClipboardCheckIcon className="h-5 w-5" />
            </div>
            <span className="flex flex-col text-base font-bold leading-tight tracking-tight text-gray-900 min-[375px]:flex-row min-[375px]:gap-1.5 min-[375px]:text-xl dark:text-white">
              <span>Quiz</span>
              <span>Builder</span>
            </span>
          </Link>

          {/* Right side controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop Theme Slider */}
            <div className="hidden md:flex items-center">
              <ThemeSlider />
            </div>

            {/* Desktop Navigation Links (>= 769px) */}
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

            {/* When burger menu is active/open: Offline badge stays in the header! */}
            {isMobileMenuOpen && (
              <div
                className="relative md:hidden"
                ref={popoverRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {isLocalMode ? (
                  <button
                    type="button"
                    onClick={handleBadgeClick}
                    className="inline-flex items-center gap-1.5 rounded-md border border-amber-300 bg-amber-50/90 px-2.5 py-1 text-xs font-semibold text-amber-800 shadow-sm transition-all hover:bg-amber-100 hover:border-amber-400 focus:outline-none dark:border-amber-700/60 dark:bg-amber-950/60 dark:text-amber-300"
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
                    className="inline-flex items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800 transition-all hover:bg-emerald-100 focus:outline-none dark:border-emerald-800/60 dark:bg-emerald-950/60 dark:text-emerald-300"
                    title="Online Mode — connected to cloud database"
                    aria-expanded={isPopoverOpen}
                  >
                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                    <span>Online</span>
                  </button>
                )}

                {isPopoverOpen && renderPopoverContent('top')}
              </div>
            )}

            {/* Mobile Hamburger Button (< 769px) */}
            <div className="relative md:hidden" ref={mobileMenuRef}>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-mint-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-750 dark:hover:text-white"
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
            </div>
          </div>
        </div>
      </header>

      {/* Floating Offline Badge in bottom right corner (active whenever burger menu is closed) */}
      {!isMobileMenuOpen && (
        <aside
          ref={popoverRef}
          aria-label="Database connectivity status"
          className="fixed bottom-4 right-4 z-40 sm:bottom-5 sm:right-5 print:hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isLocalMode ? (
            <button
              type="button"
              onClick={handleBadgeClick}
              className="group inline-flex items-center gap-2 rounded-full border border-amber-300/90 bg-amber-50/95 px-3 py-1.5 text-xs font-semibold text-amber-900 shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-amber-100 hover:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 dark:border-amber-700/80 dark:bg-amber-950/90 dark:text-amber-200 dark:hover:bg-amber-900/90"
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
              className="group inline-flex items-center gap-2 rounded-full border border-emerald-200/90 bg-emerald-50/95 px-3 py-1.5 text-xs font-medium text-emerald-900 shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:border-emerald-800/80 dark:bg-emerald-950/90 dark:text-emerald-200 dark:hover:bg-emerald-900/90"
              title="Online Mode — connected to cloud database"
              aria-expanded={isPopoverOpen}
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              <span>Online</span>
            </button>
          )}

          {/* Popover Card floating upwards */}
          {isPopoverOpen && renderPopoverContent('bottom')}
        </aside>
      )}

      {/* Mobile Menu Backdrop: Starts below header, blurring everything EXCEPT the header */}
      {isMobileMenuOpen && (
        <div
          style={{ top: `${headerHeight}px` }}
          className="fixed inset-x-0 bottom-0 z-40 bg-black/50 backdrop-blur-sm md:hidden animate-in fade-in duration-200"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Stretched Mobile Menu with Centered Text */}
      {isMobileMenuOpen && (
        <div
          style={{ top: `${headerHeight + 8}px` }}
          className="fixed inset-x-3 z-50 rounded-lg border border-gray-200 bg-white p-4 shadow-xl ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-150 dark:border-gray-800 dark:bg-gray-900 md:hidden"
        >
          <div className="flex flex-col gap-1.5">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center justify-center text-center rounded-md px-4 py-3 text-base font-medium transition ${
                pathname === '/'
                  ? 'bg-mint-50 text-mint-700 font-semibold dark:bg-mint-950/60 dark:text-mint-400'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              href="/quizzes"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center justify-center text-center rounded-md px-4 py-3 text-base font-medium transition ${
                pathname === '/quizzes'
                  ? 'bg-mint-50 text-mint-700 font-semibold dark:bg-mint-950/60 dark:text-mint-400'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white'
              }`}
            >
              Quizzes
            </Link>
            <Link
              href="/create"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center justify-center text-center rounded-md px-4 py-3 text-base font-medium transition ${
                pathname === '/create'
                  ? 'bg-mint-50 text-mint-700 font-semibold dark:bg-mint-950/60 dark:text-mint-400'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white'
              }`}
            >
              Create Quiz
            </Link>

            {/* Theme Switcher below all mobile menu elements */}
            <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-3 px-3 dark:border-gray-800">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Appearance
              </span>
              <ThemeSlider />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
