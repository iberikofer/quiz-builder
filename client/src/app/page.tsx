import Link from 'next/link';
import {
  SearchIcon,
  PlusIcon,
  DocumentListIcon,
  GridBlocksIcon,
  ShieldCheckIcon,
} from '../assets/svg';

export default function HomePage() {
  return (
    <div className="space-y-6 pb-2">
      {/* Hero Banner: Solid deep violet, no gradients, no neon */}
      <section className="relative overflow-hidden rounded-lg bg-violet-900 border border-violet-800/80 px-6 py-10 text-white shadow-md dark:bg-violet-950 dark:border-violet-900 sm:px-10 sm:py-12">
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-md border border-violet-700/70 bg-violet-800/80 px-3 py-1 text-xs font-semibold tracking-wide text-violet-100 shadow-sm">
            <span>✨ Fullstack Next.js Quiz Platform</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
            Build, Manage & Test Quizzes with Ease
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-violet-100/90 sm:text-base">
            Create custom interactive quizzes on the fly with multiple question
            types, inspect structures in detail, and manage your collection
            effortlessly.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/quizzes"
              className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-bold text-violet-900 shadow-sm transition-all duration-150 ease-out hover:-translate-y-0.5 hover:bg-violet-50 hover:shadow-md active:translate-y-0 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <SearchIcon className="h-4 w-4" />
              Explore Quizzes
            </Link>

            <Link
              href="/create"
              className="inline-flex items-center gap-2 rounded-md border border-violet-700 bg-violet-800 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-150 ease-out hover:-translate-y-0.5 hover:bg-violet-750 hover:shadow-md active:translate-y-0 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <PlusIcon className="h-4 w-4" />
              Create New Quiz
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="text-center">
          <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-2xl">
            Everything you need for interactive quizzes
          </h2>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
            Engineered with strict validation and responsive design.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:border-violet-200 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-violet-800/80">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-violet-50 text-violet-700 dark:bg-violet-950/70 dark:text-violet-300">
              <DocumentListIcon className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Multiple Question Types
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-gray-500 dark:text-gray-400 sm:text-sm">
              Supports Boolean (True/False), Short Answer Inputs, and Multiple
              Choice Checkboxes with customizable options.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:border-violet-200 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-violet-800/80">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-violet-100 text-violet-800 dark:bg-violet-900/60 dark:text-violet-300">
              <GridBlocksIcon className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Inspection Mode
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-gray-500 dark:text-gray-400 sm:text-sm">
              Review correct answers, view clean option breakdowns, and verify
              quiz logic through a structured layout.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:border-violet-200 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-violet-800/80">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-violet-50 text-violet-700 dark:bg-violet-950/70 dark:text-violet-300">
              <ShieldCheckIcon className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Zero Downtime Local Mode
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-gray-500 dark:text-gray-400 sm:text-sm">
              Works seamlessly with local browser storage whenever cloud databases
              are asleep, maintaining full functionality.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
