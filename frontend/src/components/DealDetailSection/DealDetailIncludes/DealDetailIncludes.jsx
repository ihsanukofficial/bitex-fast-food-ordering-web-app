import DealCardItemsList from '../../DealCard/DealCardItemsList/DealCardItemsList';
import styles from './DealDetailIncludes.module.css';

/**
 * DealDetailIncludes
 *
 * Lists the real products bundled into this deal, reusing the same item formatting as
 * the deal cards so the count and naming always match what's shown in the gallery.
 */
function DealDetailIncludes({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <div className={styles.section}>
      <h2 className={styles.heading}>What's included</h2>
      <DealCardItemsList items={items} />
    </div>
  );
}

export default DealDetailIncludes;
