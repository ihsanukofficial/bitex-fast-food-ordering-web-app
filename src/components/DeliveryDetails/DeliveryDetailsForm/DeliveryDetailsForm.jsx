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
 * submission to its owner.
 */
function DeliveryDetailsForm({ onSubmit }) {
  return (
    <form
      className={styles.form}
      onSubmit={onSubmit}
      onInput={(event) => event.target.setCustomValidity?.('')}
    >
      <DeliveryDetailsFields>
        <DeliveryDetailsTextField
          id="customer-name"
          label="Full name"
          placeholder="Enter your full name"
          autoComplete="name"
          minLength={2}
          required
        />
        <DeliveryDetailsTextField
          id="customer-phone"
          label="Phone number"
          type="tel"
          placeholder="e.g. +92 300 1234567"
          autoComplete="tel"
          pattern="[0-9+() -]{7,20}"
          title="Enter a valid phone number"
          required
        />
        <DeliveryDetailsTextField
          id="customer-email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
        <DeliveryAddressField />
        <DeliveryInstructionsField />
      </DeliveryDetailsFields>
      <DeliveryDetailsFormFooter />
    </form>
  );
}

export default DeliveryDetailsForm;
