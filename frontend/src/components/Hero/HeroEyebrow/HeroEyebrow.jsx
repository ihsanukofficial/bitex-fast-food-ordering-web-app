import styles from './HeroEyebrow.module.css';

/**
 * HeroEyebrow
 *
 * Renders the compact contextual label that introduces the homepage hero content.
 */
function HeroEyebrow() {
  return (
    <p className={styles.eyebrow}>
      <span aria-hidden="true" />
      Fresh. Fast. Full of flavor.
    </p>
  );
}

export default HeroEyebrow;
