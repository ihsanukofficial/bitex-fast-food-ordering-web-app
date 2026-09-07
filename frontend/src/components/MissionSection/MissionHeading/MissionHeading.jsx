import styles from './MissionHeading.module.css';

/**
 * MissionHeading
 *
 * Renders the semantic heading for the brand mission experience with feature-specific
 * presentation.
 */
function MissionHeading({ children = 'Happiness in every bite' }) {
  return (
    <h2 id="mission-heading" className={styles.heading}>
      {children}
    </h2>
  );
}

export default MissionHeading;
