import { Link } from 'react-router-dom';
import { preloadRoute } from '../../../utils/routeLoaders';
import styles from './ProductCardDetailLink.module.css';

/**
 * ProductCardDetailLink
 *
 * Creates a full-card detail target without wrapping the card actions in an invalid
 * nested link.
 */
function ProductCardDetailLink({ slug, title }) {
  if (!slug) return null;

  return (
    <Link
      className={styles.link}
      to={`/productdetail/${slug}`}
      aria-label={`View details for ${title}`}
      onPointerEnter={() => preloadRoute(`/productdetail/${slug}`)}
      onPointerDown={() => preloadRoute(`/productdetail/${slug}`)}
      onFocus={() => preloadRoute(`/productdetail/${slug}`)}
    />
  );
}

export default ProductCardDetailLink;
