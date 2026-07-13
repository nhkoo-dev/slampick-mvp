import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ROUTES } from '../../config/constants';
import { useAuth } from '../../context/AuthContext';
import Button from './Button';

// NavLink의 isActive 상태에 따라 탭 링크 className을 계산
function getTabLinkClassName({ isActive }) {
  let activeClasses = 'border-transparent text-gray-400 hover:text-text-muted';
  if (isActive) {
    activeClasses = 'border-primary text-primary';
  }

  return `pb-3 border-b-2 text-sm font-medium transition-colors ${activeClasses}`;
}

// 모바일 메뉴 안에서 사용하는 탭 링크 className (밑줄 대신 배경으로 강조)
function getMobileTabLinkClassName({ isActive }) {
  let activeClasses = 'text-gray-500';
  if (isActive) {
    activeClasses = 'bg-primary/5 text-primary';
  }

  return `rounded-xl px-4 py-3 text-sm font-medium transition-colors ${activeClasses}`;
}

// 상단 네비게이션 탭 링크 (현재 경로와 일치하면 강조 스타일 적용)
function TabLink({ to, children }) {
  return (
    <NavLink to={to} end className={getTabLinkClassName}>
      {children}
    </NavLink>
  );
}

// 햄버거 메뉴 안에서 사용하는 탭 링크 (클릭 시 메뉴를 닫는 onClick을 함께 받는다)
function MobileTabLink({ to, children, onClick }) {
  return (
    <NavLink to={to} end className={getMobileTabLinkClassName} onClick={onClick}>
      {children}
    </NavLink>
  );
}

// minimal=true면 로그인 페이지 등에서 로고 + 로그인 버튼만 보여주는 축약형 헤더로 렌더링
export default function Header({ minimal = false }) {
  const navigate = useNavigate();
  const { isLoggedIn, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // 로그아웃 처리: AuthContext의 signOut으로 세션을 정리한 뒤 홈으로 이동시킨다
  const handleLogout = async () => {
    await signOut();
    navigate(ROUTES.HOME);
  };

  // 로그인 상태에 따라 로그아웃 버튼 또는 로그인 버튼을 조건부 렌더링
  let authControl = (
    <Button variant="gradient" size="sm" onClick={() => navigate(ROUTES.LOGIN)}>
      로그인
    </Button>
  );

  // 로그인 상태일 때만 로그아웃 버튼 왼쪽에 노출되는 마이페이지 버튼
  let myPageButton = null;

  if (isLoggedIn) {
    // 로그아웃 버튼: 클릭 시 handleLogout 실행 (signOut 후 홈으로 리다이렉트)
    authControl = (
      <button
        onClick={handleLogout}
        className="text-sm font-medium text-text-secondary transition-colors hover:text-primary"
      >
        로그아웃
      </button>
    );

    myPageButton = (
      <button
        onClick={() => navigate(ROUTES.MY_PAGE)}
        className="text-sm font-medium text-text-secondary transition-colors hover:text-primary"
      >
        마이페이지
      </button>
    );
  }

  // 로고 클릭 시 홈으로 이동 (minimal/일반 헤더 공통으로 재사용)
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
          <Button variant="gradient" size="sm" onClick={() => navigate(ROUTES.LOGIN)}>
            로그인
          </Button>
        </div>
      </header>
    );
  }

  let MobileMenuIcon = Menu;
  if (isMobileMenuOpen) {
    MobileMenuIcon = X;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-10">
            {Logo}
            <nav className="hidden items-center gap-8 h-16 md:flex">
              <TabLink to={ROUTES.TODAY_LIST}>오늘의 리스트</TabLink>
              <TabLink to={ROUTES.GUIDE}>전략 시딩 가이드</TabLink>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {myPageButton}
            {authControl}
            <button
              type="button"
              aria-label="메뉴 열기"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-gray-100 md:hidden"
            >
              <MobileMenuIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav className="flex flex-col gap-1 border-t border-gray-100 py-3 md:hidden">
            <MobileTabLink to={ROUTES.TODAY_LIST} onClick={closeMobileMenu}>
              오늘의 리스트
            </MobileTabLink>
            <MobileTabLink to={ROUTES.GUIDE} onClick={closeMobileMenu}>
              전략 시딩 가이드
            </MobileTabLink>
          </nav>
        )}
      </div>
    </header>
  );
}
