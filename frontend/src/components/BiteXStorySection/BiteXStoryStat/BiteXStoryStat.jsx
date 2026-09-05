import BiteXStoryStatLabel from '../BiteXStoryStatLabel/BiteXStoryStatLabel';
import BiteXStoryStatValue from '../BiteXStoryStatValue/BiteXStoryStatValue';
import styles from './BiteXStoryStat.module.css';

/**
 * BiteXStoryStat
 *
 * Pairs one BiteX story metric with its explanatory label.
 */
function BiteXStoryStat({ value, label }) {
  return (
    <div className={styles.stat}>
      <BiteXStoryStatValue>{value}</BiteXStoryStatValue>
      <BiteXStoryStatLabel>{label}</BiteXStoryStatLabel>
    </div>
  );
}

export default BiteXStoryStat;
