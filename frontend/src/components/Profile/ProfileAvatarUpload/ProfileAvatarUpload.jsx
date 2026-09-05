import { useRef, useState } from 'react';
import Icon from '../../Utils/Icon/Icon';
import ProfileAvatarCropModal from '../ProfileAvatarCropModal/ProfileAvatarCropModal';
import { useAuth } from '../../../context/AuthContext';
import { apiClient, uploadAvatar } from '../../../services/apiClient';
import { showToast } from '../../../utils/toast';
import styles from './ProfileAvatarUpload.module.css';

const MAX_AVATAR_SIZE_BYTES = 5 * 1024 * 1024;

/**
 * Builds first-name + last-name initials from a full name, matching the same
 * convention as NavbarProfileAvatar so a customer's avatar looks identical everywhere.
 */
const getInitials = (name) => {
  const parts = (name || '').trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

/**
 * ProfileAvatarUpload
 *
 * The account center's photo control: shows the current photo (or initials), and lets
 * the customer replace or remove it. Both actions call the dedicated self-service
 * avatar endpoints (never the admin-only /api/uploads route) and refresh the shared
 * auth user afterward, so the navbar avatar updates in lockstep with this one.
 */
function ProfileAvatarUpload({ user }) {
  const { refresh } = useAuth();
  const fileInputRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [pendingFile, setPendingFile] = useState(null);

  const photoUrl = user?.avatar;
  const showPhoto = Boolean(photoUrl) && !imageFailed;
  const initials = getInitials(user?.name);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    if (file.size > MAX_AVATAR_SIZE_BYTES) {
      showToast('Image must be smaller than 5MB.', 'error');
      return;
    }

    setPendingFile(file);
  };

  const handleCropCancel = () => setPendingFile(null);

  const handleCropUpload = async (croppedFile) => {
    setIsSaving(true);
    try {
      await uploadAvatar(croppedFile);
      setImageFailed(false);
      await refresh();
      setPendingFile(null);
      showToast('Profile picture updated successfully.');
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemove = async () => {
    setIsSaving(true);
    try {
      await apiClient.delete('/users/me/avatar');
      await refresh();
      showToast('Profile picture removed.');
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={styles.avatarButton}
        onClick={() => fileInputRef.current?.click()}
        disabled={isSaving}
        aria-label={photoUrl ? 'Change profile picture' : 'Add profile picture'}
      >
        {showPhoto ? (
          <img className={styles.photo} src={photoUrl} alt="" onError={() => setImageFailed(true)} />
        ) : (
          <span className={styles.initials}>{initials}</span>
        )}
        <span className={styles.editBadge} aria-hidden="true">
          <Icon name="ri-camera-line" size="0.8rem" color="#fff" ariaLabel="" />
        </span>
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className={styles.hiddenInput}
        onChange={handleFileChange}
        tabIndex={-1}
        aria-hidden="true"
      />

      {showPhoto && (
        <button type="button" className={styles.removeButton} onClick={handleRemove} disabled={isSaving}>
          Remove
        </button>
      )}

      {pendingFile && (
        <ProfileAvatarCropModal
          file={pendingFile}
          isSaving={isSaving}
          onCancel={handleCropCancel}
          onCropped={handleCropUpload}
        />
      )}
    </div>
  );
}

export default ProfileAvatarUpload;
