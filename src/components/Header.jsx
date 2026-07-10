import { NavLink, useNavigate } from 'react-router-dom';
import { ROUTES } from '../config/constants';
import { useAuth } from '../context/AuthContext';

function TabLink({ to, children }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `pb-3 border-b-2 text-sm font-medium transition-colors ${
          isActive
            ? 'border-primary text-primary'
            : 'border-transparent text-gray-400 hover:text-gray-600'
        }`
      }
    >
      {children}
    </NavLink>
  );
}

export default function Header({ minimal = false }) {
  const navigate = useNavigate();
  const { isLoggedIn, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate(ROUTES.HOME);
  };

  const Logo = (
    <button
      onClick={() => navigate(ROUTES.HOME)}
      className="bg-gradient-to-r from-primary to-fuchsia-500 bg-clip-text font-mono text-xl font-extrabold tracking-tight text-transparent"
    >
      SLAMPICK
    </button>
  );

  if (minimal) {
    return (
      <header className="sticky top-0 z-50 border-b border-white/60 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          {Logo}
          <button
            onClick={() => navigate(ROUTES.LOGIN)}
            className="rounded-full bg-gradient-to-r from-primary to-fuchsia-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40"
          >
            로그인
          </button>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-10">
            {Logo}
            <nav className="flex items-center gap-8 h-16">
              <TabLink to={ROUTES.TODAY_LIST}>오늘의 리스트</TabLink>
              <TabLink to={ROUTES.GUIDE}>전략 시딩 가이드</TabLink>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-gray-500 transition-colors hover:text-primary"
              >
                로그아웃
              </button>
            ) : (
              <button
                onClick={() => navigate(ROUTES.LOGIN)}
                className="rounded-full bg-gradient-to-r from-primary to-fuchsia-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40"
              >
                로그인
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
