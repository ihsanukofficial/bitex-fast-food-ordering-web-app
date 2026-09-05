import DeliveryAddressField from '../DeliveryAddressField/DeliveryAddressField';
import DeliveryDetailsFields from '../DeliveryDetailsFields/DeliveryDetailsFields';
import DeliveryDetailsFormFooter from '../DeliveryDetailsFormFooter/DeliveryDetailsFormFooter';
import DeliveryDetailsTextField from '../DeliveryDetailsTextField/DeliveryDetailsTextField';
import DeliveryInstructionsField from '../DeliveryInstructionsField/DeliveryInstructionsField';
import styles from './DeliveryDetailsForm.module.css';

/**
 * DeliveryDetailsForm
 *
 * Collects delivery details with native validation and forwards a normalized order
 * submission to its owner. Pre-fills from the signed-in user's own profile so a
 * returning customer doesn't retype their details on every order — the fields stay
 * plain, editable inputs, so changing one only affects this order, never the profile.
 */
function DeliveryDetailsForm({ user, onSubmit, isSubmitting = false, error = '' }) {
  return (
    <form
      className={styles.form}
      onSubmit={onSubmit}
      onInput={(event) => event.target.setCustomValidity?.('')}
    >
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
      <DeliveryDetailsFields>
        <DeliveryDetailsTextField
          id="customer-name"
          label="Full name"
          placeholder="Enter your full name"
          autoComplete="name"
          minLength={2}
          required
          defaultValue={user?.name}
        />
        <DeliveryDetailsTextField
          id="customer-phone"
          label="Phone number"
          type="tel"
          placeholder="e.g. +92 300 1234567"
          autoComplete="tel"
          pattern="[0-9+\-\(\) ]{7,20}"
          title="Enter a valid phone number"
          required
          defaultValue={user?.phone}
        />
        <DeliveryDetailsTextField
          id="customer-email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
          defaultValue={user?.email}
        />
        <DeliveryAddressField defaultValue={user?.address} />
        <DeliveryInstructionsField />
      </DeliveryDetailsFields>
      <DeliveryDetailsFormFooter isSubmitting={isSubmitting} />
    </form>
  );
}

export default DeliveryDetailsForm;
