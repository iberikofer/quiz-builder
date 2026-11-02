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
      <section className="relative overflow-hidden rounded-lg bg-gradient-to-br from-teal-700 via-emerald-800 to-teal-950 px-6 py-10 text-white shadow-lg sm:px-10 sm:py-12">
        <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-2xl"></div>
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-mint-400/20 blur-3xl"></div>

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-md bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide text-mint-100 backdrop-blur-sm">
            <span>✨ Fullstack Next.js Quiz Platform</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
            Build, Manage & Test Quizzes with Ease
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-mint-100/90 sm:text-base">
            Create custom interactive quizzes on the fly with multiple question
            types, inspect structures in detail, and manage your collection
            effortlessly.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/quizzes"
              className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-bold text-mint-800 shadow-md transition-all hover:bg-mint-50 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <SearchIcon className="h-4 w-4" />
              Explore Quizzes
            </Link>

            <Link
              href="/create"
              className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-mint-50 text-mint-600 dark:bg-mint-950/60 dark:text-mint-400">
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

          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-teal-50 text-teal-600 dark:bg-teal-950/60 dark:text-teal-400">
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

          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
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
