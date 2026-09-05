import { useWishlist } from '../../../context/WishlistContext';
import Icon from '../../Utils/Icon/Icon';
import styles from './WishlistHeartButton.module.css';

/**
 * WishlistHeartButton
 *
 * A small circular badge that toggles one product's wishlist membership. Used both
 * as a corner overlay on ProductCard (over the catalog thumbnail) and on the product
 * detail gallery — same visual language, positioned by the caller via a `className`
 * so each context can place it without duplicating the button itself.
 */
function WishlistHeartButton({ productId, className = '' }) {
  const { isWishlisted, isPending, toggle } = useWishlist();
  const active = isWishlisted(productId);
  const pending = isPending(productId);

  const handleClick = (event) => {
    // Product cards wrap themselves in a full-card detail link; stop this from
    // triggering that navigation.
    event.preventDefault();
    event.stopPropagation();
    toggle(productId).catch(() => {});
  };

  return (
    <button
      type="button"
      className={`${styles.heart} ${active ? styles.active : ''} ${className}`.trim()}
      onClick={handleClick}
      disabled={pending}
      aria-pressed={active}
      aria-label={active ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <Icon
        name={active ? 'ri-heart-fill' : 'ri-heart-line'}
        color={active ? '#d71b1f' : '#6b6b6b'}
        size="1.05rem"
        ariaLabel=""
      />
    </button>
  );
}

export default WishlistHeartButton;
