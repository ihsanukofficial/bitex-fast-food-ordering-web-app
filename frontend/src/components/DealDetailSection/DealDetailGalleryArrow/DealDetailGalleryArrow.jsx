import Icon from '../../Utils/Icon/Icon';
import styles from './DealDetailGalleryArrow.module.css';

/**
 * DealDetailGalleryArrow
 *
 * Provides an accessible directional control for the deal-detail gallery.
 */
function DealDetailGalleryArrow({ direction, onClick }) {
  const isPrevious = direction === 'previous';

  return (
    <button
      type="button"
      className={`${styles.arrow} ${isPrevious ? styles.previous : styles.next}`}
      onClick={onClick}
      aria-label={`${isPrevious ? 'Previous' : 'Next'} deal image`}
    >
      <Icon
        name={isPrevious ? 'ri-arrow-left-s-line' : 'ri-arrow-right-s-line'}
        size="1.75rem"
        ariaLabel=""
      />
    </button>
  );
}

export default DealDetailGalleryArrow;
