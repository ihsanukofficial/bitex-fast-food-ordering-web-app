import styles from './DeliveryDetailsDismissLayer.module.css';

/**
 * DeliveryDetailsDismissLayer
 *
 * Separates backdrop dismissal from the delivery dialog so pointer and focus behavior
 * remain independent.
 */
function DeliveryDetailsDismissLayer({ isOpen, onClick }) {
  return (
    <button
      type="button"
      className={`${styles.layer} ${isOpen ? styles.visible : ''}`}
      onClick={onClick}
      aria-label="Close delivery details"
      tabIndex={isOpen ? 0 : -1}
    />
  );
}

export default DeliveryDetailsDismissLayer;
