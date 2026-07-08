import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './config/constants';
import TodayList from './pages/TodayList';
import Guide from './pages/Guide';
import Login from './pages/Login';
import Admin from './pages/Admin';

export default function App() {
  return (
    <Routes>
      <Route path={ROUTES.TODAY_LIST} element={<TodayList />} />
      <Route path={ROUTES.GUIDE} element={<Guide />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.ADMIN} element={<Admin />} />
    </Routes>
  );
}
