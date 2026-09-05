import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { apiClient } from '../../../services/apiClient';
import AdminUserAvatar from '../../../components/Admin/AdminUserAvatar/AdminUserAvatar';
import Icon from '../../../components/Utils/Icon/Icon';
import adminStyles from '../admin.module.css';
import styles from './AdminUsers.module.css';

/** AdminUsers — promotes/demotes admins and deactivates accounts. */
function AdminUsers() {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const load = () => apiClient.get('/admin/users').then((data) => setUsers(data.users));

  useEffect(() => {
    load().catch((requestError) => setError(requestError.message));
  }, []);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return users;
    return users.filter((user) =>
      [user.name, user.email, user.phone].some((field) => field?.toLowerCase().includes(query)),
    );
  }, [users, search]);

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

  return (
    <div className={adminStyles.panel}>
      <div className={adminStyles.panelHeader}>
        <div className={adminStyles.panelHeaderText}>
          <h1 className={adminStyles.panelTitle}>Users</h1>
          <p className={adminStyles.panelSubtitle}>{users.length} registered accounts</p>
        </div>
      </div>

      {error && <p className={adminStyles.error}>{error}</p>}

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
  );
}

export default AdminUsers;
