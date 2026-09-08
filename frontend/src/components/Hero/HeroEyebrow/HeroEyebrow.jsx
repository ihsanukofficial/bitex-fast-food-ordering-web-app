import styles from './HeroEyebrow.module.css';

/**
 * HeroEyebrow
 *
 * Renders the compact contextual label that introduces the homepage hero content.
 */
function HeroEyebrow({ children = 'Fresh. Fast. Full of flavor.' }) {
  return (
    <p className={styles.eyebrow}>
      <span className={styles.bar} aria-hidden="true" />
      {children}
    </p>
  );
}

export default HeroEyebrow;
