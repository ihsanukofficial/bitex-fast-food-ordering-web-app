import { useState } from 'react';
import { apiClient } from '../../../services/apiClient';
import { showToast } from '../../../utils/toast';
import styles from './EditProfileForm.module.css';

/**
 * EditProfileForm
 *
 * Updates the fields the backend actually accepts (PUT /users/me: name, phone,
 * address) — email is read-only here since the API has no endpoint to change it.
 */
function EditProfileForm({ user, onSaved, onCancel }) {
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim()) {
      setError('Full name cannot be empty.');
      return;
    }

    setError('');
    setIsSaving(true);
    try {
      const data = await apiClient.put('/users/me', { name, phone, address });
      showToast('Profile updated successfully.');
      onSaved(data.user);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <label className={styles.field}>
        <span>Full Name</span>
        <input value={name} onChange={(event) => setName(event.target.value)} required minLength={2} />
      </label>

      <label className={styles.field}>
        <span>Email</span>
        <input value={user?.email || ''} disabled />
        <span className={styles.hint}>Email address cannot be changed.</span>
      </label>

      <label className={styles.field}>
        <span>Phone Number</span>
        <input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} />
      </label>

      <label className={styles.field}>
        <span>Address</span>
        <textarea rows={3} value={address} onChange={(event) => setAddress(event.target.value)} />
      </label>

      <div className={styles.actions}>
        <button type="button" className={styles.cancelButton} onClick={onCancel} disabled={isSaving}>
          Cancel
        </button>
        <button type="submit" className={styles.saveButton} disabled={isSaving}>
          {isSaving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}

export default EditProfileForm;
