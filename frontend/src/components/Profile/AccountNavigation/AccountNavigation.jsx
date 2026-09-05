import Icon from '../../Utils/Icon/Icon';
import styles from './AccountNavigation.module.css';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: 'ri-dashboard-line' },
  { id: 'personal', label: 'Personal Information', icon: 'ri-account-circle-line' },
  { id: 'orders', label: 'Order History', icon: 'ri-file-list-3-line' },
  { id: 'reviews', label: 'My Reviews', icon: 'ri-star-line' },
  { id: 'settings', label: 'Account Settings', icon: 'ri-equalizer-2-line' },
];

/**
 * AccountNavigation
 *
 * Sidebar on desktop, a wrapping button grid on mobile (never a horizontally
 * scrolling strip) so every section stays one tap away regardless of viewport.
 */
function AccountNavigation({ activeTab, onSelectTab, onLogout }) {
  return (
    <nav className={styles.nav} aria-label="Account sections">
      <ul className={styles.list}>
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={styles.item}
              data-active={activeTab === item.id}
              aria-current={activeTab === item.id ? 'page' : undefined}
              onClick={() => onSelectTab(item.id)}
            >
              <Icon name={item.icon} size="1.1rem" ariaLabel="" />
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      <button type="button" className={styles.logout} onClick={onLogout}>
        <Icon name="ri-logout-box-r-line" size="1.1rem" ariaLabel="" />
        Log out
      </button>
    </nav>
  );
}

export default AccountNavigation;
