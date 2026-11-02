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
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 px-6 py-10 text-white shadow-lg sm:px-10 sm:py-12">
        <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-2xl"></div>
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-blue-400/20 blur-3xl"></div>

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-0.5 text-xs font-semibold tracking-wide text-blue-100 backdrop-blur-sm">
            <span>✨ Fullstack Next.js Quiz Platform</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
            Build, Manage & Test Quizzes with Ease
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-blue-100 sm:text-base">
            Create custom interactive quizzes on the fly with multiple question
            types, inspect structures in detail, and manage your collection
            effortlessly.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/quizzes"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-2.5 text-sm font-bold text-blue-700 shadow-md transition-all hover:bg-blue-50 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <SearchIcon className="h-4 w-4" />
              Explore Quizzes
            </Link>

            <Link
              href="/create"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-2.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <PlusIcon className="h-4 w-4" />
              Create New Quiz
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="text-center">
          <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
            Everything you need for interactive quizzes
          </h2>
          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            Engineered with strict validation and responsive design.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <DocumentListIcon className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-gray-900">
              Multiple Question Types
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-gray-500 sm:text-sm">
              Supports Boolean (True/False), Short Answer Inputs, and Multiple
              Choice Checkboxes with customizable options.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <GridBlocksIcon className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-gray-900">
              Inspection Mode
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-gray-500 sm:text-sm">
              Review correct answers, view clean option breakdowns, and verify
              quiz logic through a structured layout.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <ShieldCheckIcon className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-gray-900">
              Zero Downtime Local Mode
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-gray-500 sm:text-sm">
              Works seamlessly with local browser storage whenever cloud databases are asleep, maintaining full functionality.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

