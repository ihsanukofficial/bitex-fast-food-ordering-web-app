import Icon from '../../Utils/Icon/Icon';
import styles from './ProductDetailGalleryArrow.module.css';

/**
 * ProductDetailGalleryArrow
 *
 * Provides an accessible directional control for the product-detail gallery.
 */
function ProductDetailGalleryArrow({ direction, onClick }) {
  const isPrevious = direction === 'previous';

  return (
    <button
      type="button"
      className={`${styles.arrow} ${isPrevious ? styles.previous : styles.next}`}
      onClick={onClick}
      aria-label={`${isPrevious ? 'Previous' : 'Next'} product image`}
    >
      <Icon
        name={isPrevious ? 'ri-arrow-left-s-line' : 'ri-arrow-right-s-line'}
        size="1.75rem"
        ariaLabel=""
      />
    </button>
  );
}

export default ProductDetailGalleryArrow;
