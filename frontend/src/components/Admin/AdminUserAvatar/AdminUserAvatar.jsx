import { useState } from 'react';
import styles from './AdminUserAvatar.module.css';

/**
 * Renders first-name + last-name initials from a display name, falling back to a
 * single initial when only one name part is available.
 */
const getInitials = (name) => {
  const parts = (name || '').trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

/**
 * AdminUserAvatar
 *
 * Shows the account's actual photo when one is set, otherwise its initials — the
 * same fallback convention as the storefront's own NavbarProfileAvatar.
 */
function AdminUserAvatar({ name, avatar }) {
  const [imageFailed, setImageFailed] = useState(false);
  const showPhoto = Boolean(avatar) && !imageFailed;

  return (
    <span className={styles.avatar} aria-hidden="true">
      {showPhoto ? (
        <img className={styles.photo} src={avatar} alt="" onError={() => setImageFailed(true)} />
      ) : (
        getInitials(name)
      )}
    </span>
  );
}

export default AdminUserAvatar;
