'use client';

import { useTheme } from '../context/ThemeContext';

function SunIcon({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <circle cx="12" cy="12" r="4" />
      <path
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m14.14-14.14l-1.41 1.41"
      />
    </svg>
  );
}

function MoonIcon({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function ThemeSlider({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark/light theme"
      onClick={toggleTheme}
      className={`group relative inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-mint-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 ${
        isDark
          ? 'border border-mint-700/60 bg-gray-800 hover:bg-gray-750'
          : 'border border-gray-300 bg-gray-200 hover:bg-gray-250'
      } ${className}`}
    >
      <span className="sr-only">Toggle theme</span>

      {/* Track Sun Icon (visible in dark mode as guide) */}
      <span
        className={`pointer-events-none absolute left-1.5 flex items-center justify-center transition-opacity duration-200 ${
          isDark ? 'opacity-40 text-gray-400' : 'opacity-0'
        }`}
      >
        <SunIcon className="h-3.5 w-3.5" />
      </span>

      {/* Track Moon Icon (visible in light mode as guide) */}
      <span
        className={`pointer-events-none absolute right-1.5 flex items-center justify-center transition-opacity duration-200 ${
          isDark ? 'opacity-0' : 'opacity-40 text-gray-500'
        }`}
      >
        <MoonIcon className="h-3.5 w-3.5" />
      </span>

      {/* Sliding Knob with active icon */}
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-flex h-5 w-5 transform items-center justify-center rounded-full shadow-md ring-0 transition duration-200 ease-in-out ${
          isDark
            ? 'translate-x-7 bg-mint-500 text-white'
            : 'translate-x-0 bg-white text-amber-500 shadow-sm'
        }`}
      >
        {isDark ? (
          <MoonIcon className="h-3 w-3" />
        ) : (
          <SunIcon className="h-3 w-3" />
        )}
      </span>
    </button>
  );
}

export default ThemeSlider;
