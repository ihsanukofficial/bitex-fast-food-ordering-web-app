import styles from './MissionHeading.module.css';

/**
 * MissionHeading
 *
 * Renders the semantic heading for the brand mission experience with feature-specific
 * presentation.
 */
function MissionHeading() {
  return (
    <h2 id="mission-heading" className={styles.heading}>
      Happiness in every bite
    </h2>
  );
}

export default MissionHeading;
