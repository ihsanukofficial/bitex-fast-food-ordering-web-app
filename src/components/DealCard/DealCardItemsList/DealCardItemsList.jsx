import DealCardItem from '../DealCardItem/DealCardItem';
import styles from './DealCardItemsList.module.css';

/**
 * DealCardItemsList
 *
 * Provides semantic list structure and shared spacing for deal card items.
 */
function DealCardItemsList({ items = [] }) {
  return (
    <ul className={styles.list} aria-label="Deal includes">
      {items.map((item) => (
        <DealCardItem key={item}>{item}</DealCardItem>
      ))}
    </ul>
  );
}

export default DealCardItemsList;
