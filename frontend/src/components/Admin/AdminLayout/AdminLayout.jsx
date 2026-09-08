import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import Icon from '../../Utils/Icon/Icon';
import styles from './AdminLayout.module.css';

const NAV_ITEMS = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: 'ri-dashboard-line' },
  { to: '/admin/products', label: 'Products', icon: 'ri-restaurant-2-fill' },
  { to: '/admin/categories', label: 'Categories', icon: 'ri-price-tag-3-line' },
  { to: '/admin/deals', label: 'Deals', icon: 'ri-fire-fill' },
  { to: '/admin/promo-codes', label: 'Promo Codes', icon: 'ri-coupon-3-line' },
  { to: '/admin/orders', label: 'Orders', icon: 'ri-shopping-bag-3-line' },
  { to: '/admin/reviews', label: 'Reviews', icon: 'ri-star-fill' },
  { to: '/admin/users', label: 'Users', icon: 'ri-group-fill' },
  { to: '/admin/content', label: 'Site Content', icon: 'ri-article-line' },
  { to: '/admin/editor', label: 'Visual Editor', icon: 'ri-pencil-line', desktopOnly: true },
  { to: '/admin/activity-log', label: 'Activity Log', icon: 'ri-history-line' },
];

/**
 * Renders up to two initials from a display name for the sidebar avatar badge.
 */
const getInitials = (name) => {
  const parts = (name || '').trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'A';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

/**
 * AdminLayout
 *
 * Provides the persistent sidebar and chrome shared by every admin screen.
 * Only reachable by role: 'admin' accounts (enforced by RequireAdmin).
 */
function AdminLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // The visual editor renders the real public pages full-bleed so it can be a
  // faithful, pixel-perfect preview — the sidebar's admin chrome (and its
  // border-box reset — see AdminLayout.module.css) would otherwise both crowd the
  // page and risk changing how it renders.
  if (location.pathname.startsWith('/admin/editor')) return children;

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <span className={styles.brandMark} aria-hidden="true">
            B
          </span>
          <span className={styles.brandText}>
            <span className={styles.brandName}>BiteX</span>
            <span className={styles.brandTag}>Admin panel</span>
          </span>
        </div>

        <Link to="/" className={styles.visitWebsite}>
          <span className={styles.navIcon}>
            <Icon name="ri-arrow-right-line" size="1.05rem" ariaLabel="" />
          </span>
          <span className={styles.navLabelText}>Visit website</span>
        </Link>

        <span className={styles.navLabel}>Manage</span>
        <nav className={styles.nav} aria-label="Admin sections">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `${isActive ? styles.navItemActive : styles.navItem} ${item.desktopOnly ? styles.navItemDesktopOnly : ''}`.trim()
              }
            >
              <span className={styles.navIcon}>
                <Icon name={item.icon} size="1.15rem" ariaLabel="" />
              </span>
              <span className={styles.navLabelText}>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className={styles.footer}>
          <span className={styles.avatar} aria-hidden="true">
            {getInitials(user?.name)}
          </span>
          <span className={styles.footerText}>
            <p className={styles.adminName}>{user?.name}</p>
            <p className={styles.adminRole}>{user?.role}</p>
          </span>
          <button
            type="button"
            className={styles.logout}
            onClick={handleLogout}
            aria-label="Log out"
            title="Log out"
          >
            <Icon name="ri-logout-box-r-line" size="1.05rem" ariaLabel="" />
          </button>
        </div>
      </aside>
      <main className={styles.content}>{children}</main>
    </div>
  );
}

export default AdminLayout;
