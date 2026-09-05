import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import PageLoadingState from '../../Utils/PageLoadingState/PageLoadingState';

/**
 * RequireAuth
 *
 * Blocks a route until the session has been resolved, then redirects signed-out
 * visitors to /login with a return-to path so they land back where they intended.
 */
function RequireAuth({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <PageLoadingState />;

  if (!isAuthenticated) {
    const redirectTo = `${location.pathname}${location.search}`;
    return <Navigate to={`/login?redirect=${encodeURIComponent(redirectTo)}`} replace />;
  }

  return children;
}

export default RequireAuth;
