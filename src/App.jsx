import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from './config/constants';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';
import TodayList from './pages/TodayList';
import Guide from './pages/Guide';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Admin from './pages/Admin';

function HomeRoute() {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return null;

  return isLoggedIn ? <Navigate to={ROUTES.TODAY_LIST} replace /> : <Home />;
}

function RequireAuth({ children }) {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return null;

  return isLoggedIn ? children : <Navigate to={ROUTES.LOGIN} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomeRoute />} />
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
