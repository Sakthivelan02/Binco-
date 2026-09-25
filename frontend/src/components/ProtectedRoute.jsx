import { Navigate, Outlet } from 'react-router-dom';
import { getSession } from '../auth';

function ProtectedRoute() {
  return getSession() ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedRoute;
