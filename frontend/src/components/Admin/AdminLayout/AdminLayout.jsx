import { useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import useAdminActivityBadges from '../../../hooks/useAdminActivityBadges';
import Icon from '../../Utils/Icon/Icon';
import styles from './AdminLayout.module.css';

// `badge` names the section whose unread count this item shows — see
// useAdminActivityBadges for why only these three carry one.
const NAV_ITEMS = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: 'ri-dashboard-line' },
  { to: '/admin/products', label: 'Products', icon: 'ri-restaurant-2-fill' },
  { to: '/admin/categories', label: 'Categories', icon: 'ri-price-tag-3-line' },
  { to: '/admin/deals', label: 'Deals', icon: 'ri-fire-fill' },
  { to: '/admin/promo-codes', label: 'Promo Codes', icon: 'ri-coupon-3-line' },
  { to: '/admin/orders', label: 'Orders', icon: 'ri-shopping-bag-3-line', badge: 'orders' },
  { to: '/admin/reviews', label: 'Reviews', icon: 'ri-star-fill', badge: 'reviews' },
  { to: '/admin/users', label: 'Users', icon: 'ri-group-fill', badge: 'users' },
  { to: '/admin/content', label: 'Site Content', icon: 'ri-article-line' },
  { to: '/admin/editor', label: 'Visual Editor', icon: 'ri-pencil-line', desktopOnly: true },
  { to: '/admin/activity-log', label: 'Activity Log', icon: 'ri-history-line' },
];

/** Badges stop counting at 99 so a long-unvisited section can't stretch the sidebar. */
const formatBadgeCount = (count) => (count > 99 ? '99+' : String(count));

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
  const { counts, markSeen } = useAdminActivityBadges();

  // Opening a section (or sitting on it while something new lands there) clears its
  // badge — the admin is looking straight at the thing it would be pointing to.
  const activeSection = NAV_ITEMS.find(
    (item) => item.badge && location.pathname.startsWith(item.to),
  )?.badge;
  const activeSectionCount = activeSection ? counts[activeSection] : 0;

  useEffect(() => {
    if (activeSection) markSeen(activeSection);
  }, [activeSection, activeSectionCount, markSeen]);

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
          {NAV_ITEMS.map((item) => {
            const badgeCount = item.badge ? counts[item.badge] : 0;

            return (
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
                  {badgeCount > 0 && <span className={styles.navIconDot} aria-hidden="true" />}
                </span>
                <span className={styles.navLabelText}>{item.label}</span>
                {badgeCount > 0 && (
                  <span className={styles.navBadge} aria-label={`${badgeCount} new`}>
                    {formatBadgeCount(badgeCount)}
                  </span>
                )}
              </NavLink>
            );
          })}
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
