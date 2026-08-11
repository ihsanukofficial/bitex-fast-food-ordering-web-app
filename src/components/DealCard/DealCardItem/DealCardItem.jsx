import DealCardItemMarker from '../DealCardItemMarker/DealCardItemMarker';
import DealCardItemText from '../DealCardItemText/DealCardItemText';
import styles from './DealCardItem.module.css';

/**
 * DealCardItem
 *
 * Gives each bundled deal inclusion consistent semantic list-item structure.
 */
function DealCardItem({ children }) {
  return (
    <li className={styles.item}>
      <DealCardItemMarker />
      <DealCardItemText>{children}</DealCardItemText>
    </li>
  );
}

export default DealCardItem;
