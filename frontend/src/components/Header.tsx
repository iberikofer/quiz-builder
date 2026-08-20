import { NavLink } from 'react-router-dom';

function Header() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-800'
    }`;

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
        <NavLink to="/quizzes" className="text-xl font-bold text-gray-900">
          Quiz Builder
        </NavLink>
        <nav className="flex gap-6">
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
