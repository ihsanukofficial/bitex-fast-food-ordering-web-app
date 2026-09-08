import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { CLOSE_OVERLAYS_EVENT } from '../../../utils/notificationConstants';
import { preloadRoute } from '../../../utils/routeLoaders';
import Icon from '../../Utils/Icon/Icon';
import styles from './NavbarProfileAvatar.module.css';

/**
 * Builds first-name + last-name initials from a full name, falling back to a
 * single initial (or a generic glyph) when only one name part is available.
 */
const getInitials = (name) => {
  const parts = (name || '').trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

/**
 * NavbarProfileAvatar
 *
 * Signed-in entry point into the account menu: the user's actual photo when one is
 * set, otherwise their initials on a branded circular badge. Clicking it opens a
 * small menu (view profile, log out) rather than navigating straight to /profile.
 */
function NavbarProfileAvatar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [imageFailed, setImageFailed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const photoUrl = user?.avatar;
  const showPhoto = Boolean(photoUrl) && !imageFailed;
  const initials = getInitials(user?.name);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    window.addEventListener(CLOSE_OVERLAYS_EVENT, closeMenu);
    return () => window.removeEventListener(CLOSE_OVERLAYS_EVENT, closeMenu);
  }, []);

  const handleLogout = async () => {
    closeMenu();
    await logout();
    navigate('/');
  };

  const avatarContent = showPhoto ? (
    <img className={styles.photo} src={photoUrl} alt="" onError={() => setImageFailed(true)} />
  ) : (
    <span className={styles.initials}>{initials}</span>
  );

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        type="button"
        className={styles.avatar}
        aria-label="Your account menu"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        onPointerEnter={() => preloadRoute('/profile')}
        onFocus={() => preloadRoute('/profile')}
      >
        {avatarContent}
      </button>

      {isOpen && (
        <div className={styles.menu} role="menu" aria-label="Account">
          <div className={styles.menuHeader}>
            <span className={styles.menuAvatar} aria-hidden="true">
              {avatarContent}
            </span>
            <span className={styles.menuHeaderText}>
              <p className={styles.menuName}>{user?.name}</p>
              {user?.email && <p className={styles.menuEmail}>{user.email}</p>}
            </span>
          </div>

          <div className={styles.menuItems}>
            <Link className={styles.menuItem} to="/profile" role="menuitem" onClick={closeMenu}>
              <span className={styles.menuItemIcon}>
                <Icon name="ri-account-circle-line" size="1.05rem" ariaLabel="" />
              </span>
              View Profile
            </Link>
            <Link className={styles.menuItem} to="/wishlist" role="menuitem" onClick={closeMenu}>
              <span className={styles.menuItemIcon}>
                <Icon name="ri-heart-line" size="1.05rem" ariaLabel="" />
              </span>
              Wishlist
            </Link>
            {user?.role === 'admin' && (
              <Link className={styles.menuItem} to="/admin" role="menuitem" onClick={closeMenu}>
                <span className={styles.menuItemIcon}>
                  <Icon name="ri-dashboard-line" size="1.05rem" ariaLabel="" />
                </span>
                Admin Panel
              </Link>
            )}
            <button
              type="button"
              className={`${styles.menuItem} ${styles.logoutItem}`}
              role="menuitem"
              onClick={handleLogout}
            >
              <span className={styles.menuItemIcon}>
                <Icon name="ri-logout-box-r-line" size="1.05rem" ariaLabel="" />
              </span>
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavbarProfileAvatar;
