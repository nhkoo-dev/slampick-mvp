import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from './config/constants';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';
import TodayList from './pages/TodayList';
import Guide from './pages/Guide';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Admin from './pages/Admin';

// '/' 경로 전용 분기: 로그인 상태면 오늘의 리스트로, 아니면 랜딩 페이지(Home)로 보낸다
function HomeRoute() {
  const { isLoggedIn, loading } = useAuth();

  // 세션 조회가 끝나기 전에는 아무것도 렌더링하지 않아 로그인 여부 깜빡임(flicker)을 방지
  if (loading) return null;

  if (isLoggedIn) {
    return <Navigate to={ROUTES.TODAY_LIST} replace />;
  }

  return <Home />;
  
}

// 로그인이 필요한 라우트를 감싸는 가드: 비로그인 상태면 로그인 페이지로 리다이렉트
function RequireAuth({ children }) {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return null;

  if (isLoggedIn) {
    return children;
  } 
    
  return <Navigate to={ROUTES.LOGIN} replace />;
  
}

export default function App() {
  return (
    <Routes>
      {/* 로그인 여부에 따라 Home 또는 TodayList로 분기되는 진입점 */}
      <Route path={ROUTES.HOME} element={<HomeRoute />} />
      {/* 로그인 필수 페이지: 비로그인 접근 시 RequireAuth가 /login으로 리다이렉트 */}
      <Route
        path={ROUTES.TODAY_LIST}
        element={
          <RequireAuth>
            <TodayList />
          </RequireAuth>
        }
      />
      <Route path={ROUTES.GUIDE} element={<Guide />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.SIGNUP} element={<Signup />} />
      <Route path={ROUTES.ADMIN} element={<Admin />} />
    </Routes>
  );
}
