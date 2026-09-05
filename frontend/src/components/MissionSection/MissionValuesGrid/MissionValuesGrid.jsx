import MissionValueCard from '../MissionValueCard/MissionValueCard';
import styles from './MissionValuesGrid.module.css';

/**
 * MissionValuesGrid
 *
 * Builds the mission value collection from shared data so copy and presentation remain
 * independently maintainable.
 */
function MissionValuesGrid({ values = [] }) {
  return (
    <div className={styles.values}>
      {values.map((value) => (
        <MissionValueCard key={value.number} {...value} />
      ))}
    </div>
  );
}

export default MissionValuesGrid;
