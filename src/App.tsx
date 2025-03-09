import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import StoresPage from './pages/StoresPage';
import SKUsPage from './pages/SKUsPage';
import PlanningPage from './pages/PlanningPage';
import ChartPage from './pages/ChartPage';
import LoginPage from './pages/LoginPage';
import { useAppSelector } from './app/hooks';

function App() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      <Route
        path="/"
        element={user ? <Layout /> : <Navigate to="/login" replace />}
      >
        <Route index element={<Navigate to="stores" replace />} />
        <Route path="stores" element={<StoresPage />} />
        <Route path="skus" element={<SKUsPage />} />
        <Route path="planning" element={<PlanningPage />} />
        
        {user?.role === 'superadmin' && (
          <Route path="chart" element={<ChartPage />} />
        )}
        
        {/* Catch-all route for invalid paths */}
        <Route path="*" element={<Navigate to="stores" replace />} />
      </Route>
    </Routes>
  );
}

export default App;