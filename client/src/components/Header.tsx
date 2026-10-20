import { NavLink } from 'react-router-dom';
import { ClipboardCheckIcon } from '../assets/svg';

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
        <NavLink to="/" className="group flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm transition-transform group-hover:scale-105">
            <ClipboardCheckIcon className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            Quiz Builder
          </span>
        </NavLink>
        <nav className="flex items-center gap-2">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
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
