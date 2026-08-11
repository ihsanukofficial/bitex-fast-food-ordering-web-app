import styles from './DeliveryDetailsTextarea.module.css';

/**
 * DeliveryDetailsTextarea
 *
 * Provides the controlled multiline field used by the delivery and checkout flow.
 */
function DeliveryDetailsTextarea({
  id,
  name,
  rows,
  placeholder,
  autoComplete,
  minLength,
  required = false,
  variant = 'instructions',
}) {
  return (
    <textarea
      className={`${styles.textarea} ${styles[variant] || ''}`}
      id={id}
      name={name}
      rows={rows}
      placeholder={placeholder}
      autoComplete={autoComplete}
      minLength={minLength}
      required={required}
    />
  );
}

export default DeliveryDetailsTextarea;
