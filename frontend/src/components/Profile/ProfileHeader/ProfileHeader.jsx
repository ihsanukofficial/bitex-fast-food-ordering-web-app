import Icon from '../../Utils/Icon/Icon';
import ProfileAvatarUpload from '../ProfileAvatarUpload/ProfileAvatarUpload';
import styles from './ProfileHeader.module.css';

const formatMemberSince = (isoString) => {
  if (!isoString) return null;
  return new Date(isoString).toLocaleDateString('en-PK', { month: 'long', year: 'numeric' });
};

/**
 * ProfileHeader
 *
 * The identity strip at the top of the account center — who you are, how to reach you,
 * and the single entry point into editing that information.
 */
function ProfileHeader({ user, onEditProfile }) {
  const memberSince = formatMemberSince(user?.createdAt);

  return (
    <div className={styles.header}>
      <div className={styles.identity}>
        <ProfileAvatarUpload user={user} />
        <div className={styles.details}>
          <h1 className={styles.name}>{user?.name}</h1>
          <div className={styles.contactRow}>
            <span className={styles.contactItem}>
              <Icon name="ri-mail-line" size="0.95rem" ariaLabel="" />
              {user?.email}
            </span>
            {user?.phone && (
              <span className={styles.contactItem}>
                <Icon name="ri-phone-line" size="0.95rem" ariaLabel="" />
                {user.phone}
              </span>
            )}
          </div>
          {memberSince && <p className={styles.memberSince}>Member since {memberSince}</p>}
        </div>
      </div>

      <button type="button" className={styles.editButton} onClick={onEditProfile}>
        <Icon name="ri-pencil-line" size="1rem" ariaLabel="" />
        Edit Profile
      </button>
    </div>
  );
}

export default ProfileHeader;
