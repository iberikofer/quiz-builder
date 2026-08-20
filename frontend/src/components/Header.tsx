import { NavLink } from 'react-router-dom';

function Header() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all ${
      isActive
        ? 'bg-blue-50 text-blue-700 font-semibold'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3.5">
        <NavLink to="/quizzes" className="group flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm transition-transform group-hover:scale-105">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z" />
              <path d="m9 14 2 2 4-4" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            Quiz Builder
          </span>
        </NavLink>
        <nav className="flex items-center gap-2">
          <NavLink to="/quizzes" className={linkClass} end>
            Quizzes
          </NavLink>
          <NavLink to="/create" className={linkClass}>
            Create Quiz
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
