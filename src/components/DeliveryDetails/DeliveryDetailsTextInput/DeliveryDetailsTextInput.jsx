import styles from './DeliveryDetailsTextInput.module.css';

/**
 * DeliveryDetailsTextInput
 *
 * Provides the controlled Delivery Details Text Input field with feature-specific
 * presentation.
 */
function DeliveryDetailsTextInput({
  id,
  name,
  type,
  placeholder,
  autoComplete,
  required,
  minLength,
  pattern,
  title,
}) {
  return (
    <input
      className={styles.input}
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      autoComplete={autoComplete}
      required={required}
      minLength={minLength}
      pattern={pattern}
      title={title}
    />
  );
}

export default DeliveryDetailsTextInput;
