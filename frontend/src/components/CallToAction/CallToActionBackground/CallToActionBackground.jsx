import styles from './CallToActionBackground.module.css';

/**
 * CallToActionBackground
 *
 * Isolates the decorative backdrop used by the call-to-action experience from its
 * semantic content.
 */
function CallToActionBackground({ children }) {
  return (
    <section
      className={styles.background}
      aria-labelledby="call-to-action-heading"
    >
      {children}
    </section>
  );
}

export default CallToActionBackground;
