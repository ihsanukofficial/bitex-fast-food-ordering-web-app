import biteXStoryStats from '../../../data/biteXStoryStats';
import BiteXStoryStat from '../BiteXStoryStat/BiteXStoryStat';
import styles from './BiteXStoryStats.module.css';

/**
 * BiteXStoryStats
 *
 * Builds the BiteX story metrics from centralized data definitions.
 */
function BiteXStoryStats() {
  return (
    <dl className={styles.stats}>
      {biteXStoryStats.map(({ value, label }) => (
        <BiteXStoryStat key={label} value={value} label={label} />
      ))}
    </dl>
  );
}

export default BiteXStoryStats;
