'use client';

import { useTheme } from '../context/ThemeContext';

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
      className={`group relative inline-flex h-7 w-13 shrink-0 cursor-pointer items-center rounded-full border border-gray-300 bg-gray-200 p-0.5 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-mint-500 focus:ring-offset-1 dark:border-mint-700/60 dark:bg-mint-950/80 ${className}`}
    >
      <span className="sr-only">Toggle theme</span>

      {/* Sun / Moon icons in track */}
      <div className="absolute inset-0 flex items-center justify-between px-1.5 text-[10px] pointer-events-none select-none">
        <span
          className={`transition-opacity duration-150 ${
            isDark ? 'opacity-30' : 'opacity-100 text-amber-500'
          }`}
        >
          ☀️
        </span>
        <span
          className={`transition-opacity duration-150 ${
            isDark ? 'opacity-100 text-mint-300' : 'opacity-30'
          }`}
        >
          🌙
        </span>
      </div>

      {/* Sliding Knob */}
      <span
        aria-hidden="true"
        className={`pointer-events-none z-10 inline-flex h-5 w-5 transform items-center justify-center rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out dark:bg-mint-500 dark:text-white ${
          isDark ? 'translate-x-6' : 'translate-x-0.5'
        }`}
      >
        <span className="text-[10px] leading-none select-none">
          {isDark ? '🌙' : '☀️'}
        </span>
      </span>
    </button>
  );
}

export default ThemeSlider;
