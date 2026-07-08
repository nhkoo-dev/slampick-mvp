import { NavLink } from 'react-router-dom';
import { ROUTES } from '../config/constants';

function TabLink({ to, children }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `pb-3 border-b-2 text-sm font-medium transition-colors ${
          isActive
            ? 'border-black text-black'
            : 'border-transparent text-gray-400 hover:text-gray-600'
        }`
      }
    >
      {children}
    </NavLink>
  );
}

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-10">
            <span className="text-xl font-extrabold tracking-tight text-black">
              SLAMPICK
            </span>
            <nav className="flex items-center gap-8 h-16">
              <TabLink to={ROUTES.TODAY_LIST}>오늘의 리스트</TabLink>
              <TabLink to={ROUTES.GUIDE}>전략 시딩 가이드</TabLink>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-full bg-black px-4 py-2 text-xs font-semibold text-white"
            >
              구독(실시간)
            </button>
            <button
              type="button"
              className="rounded-full border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700"
            >
              체험(무료)
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
