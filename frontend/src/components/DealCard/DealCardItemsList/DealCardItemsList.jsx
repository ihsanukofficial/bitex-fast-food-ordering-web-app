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
      {items
        .filter((item) => item.product)
        .map((item) => {
          const variationText = (item.variationSelections || [])
            .map((selection) => selection.optionLabel)
            .join(', ');
          return (
            <DealCardItem key={item.product._id}>
              {item.quantity}× {item.product.title}
              {variationText && ` (${variationText})`}
            </DealCardItem>
          );
        })}
    </ul>
  );
}

export default DealCardItemsList;
