import PopularItemCard from '../PopularItemCard/PopularItemCard';
import styles from './PopularItemsGrid.module.css';

/**
 * PopularItemsGrid
 *
 * Renders the admin-curated product picks. Each entry references a live Product
 * document, so its image/route stay correct even if that product later changes.
 */
const PopularItemsGrid = ({ items }) => {
  return (
    <div className={styles.grid}>
      {items
        .filter((item) => item.product)
        .map((item) => (
          <PopularItemCard
            key={item.product._id}
            src={item.product.images[0]}
            alt={item.label || item.product.title}
            label={item.label || item.product.title}
            to={`/productdetail/${item.product.slug}`}
          />
        ))}
    </div>
  );
};

export default PopularItemsGrid;
