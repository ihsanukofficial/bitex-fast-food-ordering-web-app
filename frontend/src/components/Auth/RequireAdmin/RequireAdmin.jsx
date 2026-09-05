import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useNotifications } from '../../../context/NotificationContext';
import { showToast } from '../../../utils/toast';
import PageLoadingState from '../../Utils/PageLoadingState/PageLoadingState';
import AccessDenied from '../AccessDenied/AccessDenied';

/**
 * RequireAdmin
 *
 * Blocks admin routes until the session resolves. Signed-out visitors go to /login
 * (where they can sign in and land back here). Signed-in non-admins get an in-place
 * access-denied message instead — redirecting them to /login would bounce right back
 * here once Login sees they're already authenticated, looping forever.
 *
 * Also listens for a live "your admin access was just revoked" event over the shared
 * notification socket, so a session already inside the panel drops into the
 * access-denied state the instant another admin changes their role — not just on the
 * next page load or API call.
 */
function RequireAdmin({ children }) {
  const { user, isLoading, isAuthenticated, refresh } = useAuth();
  const { socket } = useNotifications();

  useEffect(() => {
    if (!socket) return undefined;

    const handleAccessRevoked = () => {
      refresh().catch(() => {});
      showToast('Your admin access has been revoked.', 'error');
    };

    socket.on('auth:access-revoked', handleAccessRevoked);
    return () => socket.off('auth:access-revoked', handleAccessRevoked);
  }, [socket, refresh]);

  if (isLoading) return <PageLoadingState />;
  if (!isAuthenticated) return <Navigate to="/login?redirect=%2Fadmin" replace />;
  if (user.role !== 'admin') return <AccessDenied />;

  return children;
}

export default RequireAdmin;
