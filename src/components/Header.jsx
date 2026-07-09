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
  const navigate = useNavigate();
  const { isLoggedIn, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate(ROUTES.TODAY_LIST);
  };

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

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                로그아웃
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate(ROUTES.LOGIN)}
                  className="text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                  로그인
                </button>
                <button
                  onClick={() => navigate(ROUTES.SIGNUP)}
                  className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                >
                  회원가입
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
