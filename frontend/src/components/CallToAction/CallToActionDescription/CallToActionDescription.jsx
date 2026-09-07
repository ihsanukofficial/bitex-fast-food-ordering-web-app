import styles from './CallToActionDescription.module.css';

/**
 * CallToActionDescription
 *
 * Renders supporting copy for the call-to-action experience with consistent
 * typography.
 */
function CallToActionDescription({
  children = 'Explore our wide variety of mouth-watering meals and discover exclusive deals crafted to make every craving worth it.',
}) {
  return <p className={styles.description}>{children}</p>;
}

export default CallToActionDescription;
