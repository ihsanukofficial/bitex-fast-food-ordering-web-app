import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { apiClient } from '../../../services/apiClient';
import AdminUserAvatar from '../../../components/Admin/AdminUserAvatar/AdminUserAvatar';
import Icon from '../../../components/Utils/Icon/Icon';
import adminStyles from '../admin.module.css';
import styles from './AdminUsers.module.css';

const ROLES = ['user', 'admin'];
// '' is the "All" tab — same pattern as AdminOrders' status tabs (URL-backed via the
// `role` query param, so a filtered view stays bookmarkable/shareable).
const ROLE_TABS = [
  { role: '', label: 'All', icon: 'ri-group-line' },
  { role: 'user', label: 'Users', icon: 'ri-user-3-line' },
  { role: 'admin', label: 'Admins', icon: 'ri-shield-star-line' },
];

/** AdminUsers — promotes/demotes admins and deactivates accounts. */
function AdminUsers() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const requestedRole = searchParams.get('role') || '';
  // Falls back to "All" for a stale/hand-edited URL naming a role that doesn't exist.
  const roleFilter = ROLES.includes(requestedRole) ? requestedRole : '';
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const load = () => apiClient.get('/admin/users').then((data) => setUsers(data.users));

  useEffect(() => {
    load().catch((requestError) => setError(requestError.message));
  }, []);

  const roleCounts = useMemo(
    () => ({
      '': users.length,
      user: users.filter((user) => user.role === 'user').length,
      admin: users.filter((user) => user.role === 'admin').length,
    }),
    [users],
  );

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return users.filter((user) => {
      if (roleFilter && user.role !== roleFilter) return false;
      if (!query) return true;
      return [user.name, user.email, user.phone].some((field) => field?.toLowerCase().includes(query));
    });
  }, [users, search, roleFilter]);

  const handleUpdate = async (user, changes) => {
    setUpdatingId(user._id);
    setError('');
    try {
      await apiClient.put(`/admin/users/${user._id}`, changes);
      await load();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (user) => {
    if (!window.confirm(`Permanently delete ${user.name}'s account? This cannot be undone.`)) return;
    setUpdatingId(user._id);
    setError('');
    try {
      await apiClient.delete(`/admin/users/${user._id}`);
      await load();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className={adminStyles.panel}>
      <div className={adminStyles.panelHeader}>
        <div className={adminStyles.panelHeaderText}>
          <h1 className={adminStyles.panelTitle}>Users</h1>
          <p className={adminStyles.panelSubtitle}>
            {filteredUsers.length} {roleFilter ? roleFilter : 'registered'} account
            {filteredUsers.length === 1 ? '' : 's'}
          </p>
        </div>
      </div>

      <div className={styles.filters}>
        <div className={styles.searchField}>
          <Icon name="ri-search-line" size="1rem" ariaLabel="" />
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Search by name, email, or phone…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>

      <nav className={adminStyles.tabList} aria-label="Filter users by role">
        {ROLE_TABS.map((tab) => (
          <Link
            key={tab.role}
            to={tab.role ? `/admin/users?role=${tab.role}` : '/admin/users'}
            className={tab.role === roleFilter ? adminStyles.tabButtonActive : adminStyles.tabButton}
            aria-current={tab.role === roleFilter ? 'page' : undefined}
          >
            <Icon name={tab.icon} size="0.95rem" ariaLabel="" />
            {tab.label}
            <span className={adminStyles.badge}>{roleCounts[tab.role]}</span>
          </Link>
        ))}
      </nav>

      <div className={adminStyles.tabPanel}>
        {error && <p className={adminStyles.error}>{error}</p>}

        <div className={adminStyles.tableWrap}>
          <table className={adminStyles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => {
                const isSelf = user._id === currentUser?.id;
                return (
                  <tr
                    key={user._id}
                    className={adminStyles.clickableRow}
                    onClick={() => navigate(`/admin/users/${user._id}`)}
                  >
                    <td className={adminStyles.cellPrimary}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <AdminUserAvatar name={user.name} avatar={user.avatar} />
                        <span>
                          {user.name}
                          {isSelf && <small className={adminStyles.cellMuted}> (you)</small>}
                        </span>
                      </div>
                    </td>
                    <td className={adminStyles.cellMuted}>{user.email}</td>
                    <td>
                      <span className={adminStyles.badge} data-tone={user.role === 'admin' ? 'accent' : undefined}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span className={adminStyles.badge} data-tone={user.active ? 'success' : 'danger'}>
                        {user.active ? 'active' : 'deactivated'}
                      </span>
                    </td>
                    <td className={adminStyles.cellMuted}>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td onClick={(event) => event.stopPropagation()}>
                      <div className={adminStyles.actions}>
                        <button
                          className={adminStyles.linkButton}
                          type="button"
                          disabled={isSelf || updatingId === user._id}
                          onClick={() =>
                            handleUpdate(user, { role: user.role === 'admin' ? 'user' : 'admin' })
                          }
                        >
                          {user.role === 'admin' ? 'Revoke admin' : 'Make admin'}
                        </button>
                        <button
                          className={adminStyles.dangerButton}
                          type="button"
                          disabled={isSelf || updatingId === user._id}
                          onClick={() => handleUpdate(user, { active: !user.active })}
                        >
                          {user.active ? 'Deactivate' : 'Reactivate'}
                        </button>
                        <button
                          className={`${adminStyles.rowIconButton} ${adminStyles.rowIconButtonDanger}`}
                          type="button"
                          title="Delete account"
                          aria-label={`Delete ${user.name}'s account`}
                          disabled={isSelf || updatingId === user._id}
                          onClick={() => handleDelete(user)}
                        >
                          <Icon name="ri-delete-bin-line" size="0.95rem" ariaLabel="" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {users.length > 0 && filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={6} className={adminStyles.emptyState}>
                    No users match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;
