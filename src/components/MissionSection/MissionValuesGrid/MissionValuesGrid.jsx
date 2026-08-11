import missionValues from '../../../data/missionValues';
import MissionValueCard from '../MissionValueCard/MissionValueCard';
import styles from './MissionValuesGrid.module.css';

/**
 * MissionValuesGrid
 *
 * Builds the mission value collection from shared data so copy and presentation remain
 * independently maintainable.
 */
function MissionValuesGrid() {
  return (
    <div className={styles.values}>
      {missionValues.map((value) => (
        <MissionValueCard key={value.number} {...value} />
      ))}
    </div>
  );
}

export default MissionValuesGrid;
