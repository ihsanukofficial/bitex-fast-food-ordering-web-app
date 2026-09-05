import Icon from '../../Utils/Icon/Icon';
import EditProfileForm from '../EditProfileForm/EditProfileForm';
import styles from './PersonalInformation.module.css';

/**
 * PersonalInformation
 *
 * Read-only account details with a single edit entry point — only fields the backend
 * actually stores (name, email, phone, address) are shown; there is no password or
 * other sensitive field here.
 */
function PersonalInformation({ user, isEditing, onStartEdit, onCancelEdit, onSaved }) {
  if (isEditing) {
    return (
      <section className={styles.section} aria-labelledby="personal-information-heading">
        <h2 id="personal-information-heading" className={styles.heading}>
          Edit Personal Information
        </h2>
        <EditProfileForm user={user} onSaved={onSaved} onCancel={onCancelEdit} />
      </section>
    );
  }

  const fields = [
    { icon: 'ri-account-circle-line', label: 'Full Name', value: user?.name },
    { icon: 'ri-mail-line', label: 'Email', value: user?.email },
    { icon: 'ri-phone-line', label: 'Phone Number', value: user?.phone || 'Not provided' },
    { icon: 'ri-map-pin-line', label: 'Address', value: user?.address || 'Not provided' },
  ];

  return (
    <section className={styles.section} aria-labelledby="personal-information-heading">
      <div className={styles.header}>
        <h2 id="personal-information-heading" className={styles.heading}>
          Personal Information
        </h2>
        <button type="button" className={styles.editButton} onClick={onStartEdit}>
          <Icon name="ri-pencil-line" size="0.95rem" ariaLabel="" />
          Edit Profile
        </button>
      </div>

      <dl className={styles.list}>
        {fields.map((field) => (
          <div key={field.label} className={styles.row}>
            <dt className={styles.term}>
              <Icon name={field.icon} size="1rem" ariaLabel="" />
              {field.label}
            </dt>
            <dd className={styles.value}>{field.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default PersonalInformation;
