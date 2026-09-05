import { useState } from 'react';
import Icon from '../../Utils/Icon/Icon';
import { apiClient } from '../../../services/apiClient';
import { showToast } from '../../../utils/toast';
import styles from './AccountSettings.module.css';

const PASSWORD_MIN_LENGTH = 8;

/**
 * AccountSettings
 *
 * Password changes, logout, and account deletion. Deleting requires re-entering the
 * current password, same as changing it — the backend re-verifies it server-side
 * regardless, but asking up front avoids someone finding out only after submitting.
 */
function AccountSettings({ user, onLogout, onAccountDeleted }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (newPassword.length < PASSWORD_MIN_LENGTH) {
      setError(`New password must be at least ${PASSWORD_MIN_LENGTH} characters.`);
      return;
    }

    setIsSaving(true);
    try {
      await apiClient.put('/users/me/password', { currentPassword, newPassword });
      setCurrentPassword('');
      setNewPassword('');
      showToast('Password changed successfully.');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmingDelete(false);
    setDeletePassword('');
    setDeleteError('');
  };

  const handleDeleteAccount = async (event) => {
    event.preventDefault();
    setDeleteError('');

    if (!deletePassword) {
      setDeleteError('Enter your password to confirm.');
      return;
    }

    setIsDeleting(true);
    try {
      await apiClient.delete('/users/me', { password: deletePassword });
      onAccountDeleted();
    } catch (requestError) {
      setDeleteError(requestError.message);
      setIsDeleting(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <section className={styles.section} aria-labelledby="password-heading">
        <h2 id="password-heading" className={styles.heading}>
          Password
        </h2>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}
          <label className={styles.field}>
            <span>Current Password</span>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span>New Password</span>
            <input
              type="password"
              required
              minLength={PASSWORD_MIN_LENGTH}
              autoComplete="new-password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
          </label>
          <button type="submit" className={styles.saveButton} disabled={isSaving}>
            {isSaving ? 'Updating…' : 'Change Password'}
          </button>
        </form>
      </section>

      <section className={styles.section} aria-labelledby="account-heading">
        <h2 id="account-heading" className={styles.heading}>
          Account
        </h2>
        <p className={styles.accountEmail}>
          Signed in as <strong>{user?.email}</strong>
        </p>
        <button type="button" className={styles.logoutButton} onClick={onLogout}>
          <Icon name="ri-logout-box-r-line" size="1rem" ariaLabel="" />
          Log out
        </button>
      </section>

      <section className={styles.dangerSection} aria-labelledby="danger-heading">
        <h2 id="danger-heading" className={styles.dangerHeading}>
          Danger Zone
        </h2>
        <p className={styles.dangerDescription}>
          Permanently delete your account and all of your personal data. This cannot be undone.
        </p>

        {!isConfirmingDelete ? (
          <button
            type="button"
            className={styles.deleteButton}
            onClick={() => setIsConfirmingDelete(true)}
          >
            <Icon name="ri-delete-bin-line" size="1rem" ariaLabel="" />
            Delete Account
          </button>
        ) : (
          <form className={styles.form} onSubmit={handleDeleteAccount} noValidate>
            {deleteError && (
              <p className={styles.error} role="alert">
                {deleteError}
              </p>
            )}
            <label className={styles.field}>
              <span>Enter your password to confirm</span>
              <input
                type="password"
                required
                autoComplete="current-password"
                autoFocus
                value={deletePassword}
                onChange={(event) => setDeletePassword(event.target.value)}
              />
            </label>
            <div className={styles.dangerActions}>
              <button type="submit" className={styles.deleteButton} disabled={isDeleting}>
                {isDeleting ? 'Deleting…' : 'Permanently Delete Account'}
              </button>
              <button
                type="button"
                className={styles.cancelDeleteButton}
                onClick={handleCancelDelete}
                disabled={isDeleting}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}

export default AccountSettings;
