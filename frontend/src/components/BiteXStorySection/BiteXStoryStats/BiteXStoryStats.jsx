import { useEditMode } from '../../../context/EditModeContext';
import EditableText from '../../Utils/Editable/EditableText';
import BiteXStoryStat from '../BiteXStoryStat/BiteXStoryStat';
import styles from './BiteXStoryStats.module.css';

/**
 * BiteXStoryStats
 *
 * Builds the BiteX story metrics from centralized data definitions. These are three
 * fixed slots in the story layout, not a free-form list — editing swaps each one's
 * value/label in place, with no add/remove.
 */
function BiteXStoryStats({ stats = [] }) {
  const edit = useEditMode();

  if (!edit) {
    return (
      <dl className={styles.stats}>
        {stats.map(({ value, label }) => (
          <BiteXStoryStat key={label} value={value} label={label} />
        ))}
      </dl>
    );
  }

  return (
    <dl className={styles.stats}>
      {stats.map((stat, index) => (
        <BiteXStoryStat
          key={index}
          value={<EditableText page="about" path={['story', 'stats', index, 'value']} value={stat.value} />}
          label={<EditableText page="about" path={['story', 'stats', index, 'label']} value={stat.label} />}
        />
      ))}
    </dl>
  );
}

export default BiteXStoryStats;
