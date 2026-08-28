import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RequireEmployee({ children }) {
  const { isEmployeeAuthenticated } = useAuth();
  const location = useLocation();

  if (!isEmployeeAuthenticated) {
    return <Navigate to="/staff/login" state={{ from: location }} replace />;
  }

  return children;
}
