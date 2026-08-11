import popularItems from '../../../data/popularItems';
import PopularItemCard from '../PopularItemCard/PopularItemCard';
import styles from './PopularItemsGrid.module.css';

/**
 * PopularItemsGrid
 *
 * Resolves curated product references against the catalog before rendering cards,
 * preventing duplicated product metadata.
 */
const PopularItemsGrid = () => {
  return (
    <div className={styles.grid}>
      {popularItems.map((item) => (
        <PopularItemCard
          key={item.productId}
          src={item.src}
          alt={item.alt}
          label={item.label}
          to={item.to}
        />
      ))}
    </div>
  );
};

export default PopularItemsGrid;
