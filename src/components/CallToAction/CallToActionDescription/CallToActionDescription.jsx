import styles from './CallToActionDescription.module.css';

/**
 * CallToActionDescription
 *
 * Renders supporting copy for the call-to-action experience with consistent
 * typography.
 */
function CallToActionDescription() {
  return (
    <p className={styles.description}>
      Explore our wide variety of mouth-watering meals and discover exclusive
      deals crafted to make every craving worth it.
    </p>
  );
}

export default CallToActionDescription;
