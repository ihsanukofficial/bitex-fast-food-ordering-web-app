import styles from './DeliveryDetailsHeaderText.module.css';

/**
 * DeliveryDetailsHeaderText
 *
 * Provides the styled text primitive used by the delivery and checkout composition.
 */
function DeliveryDetailsHeaderText({ children }) {
  return <div className={styles.text}>{children}</div>;
}

export default DeliveryDetailsHeaderText;
