import CartDrawerCloseButton from '../CartDrawerCloseButton/CartDrawerCloseButton';
import CartDrawerHeaderEyebrow from '../CartDrawerHeaderEyebrow/CartDrawerHeaderEyebrow';
import CartDrawerHeaderItemCount from '../CartDrawerHeaderItemCount/CartDrawerHeaderItemCount';
import CartDrawerHeaderText from '../CartDrawerHeaderText/CartDrawerHeaderText';
import CartDrawerHeaderTitle from '../CartDrawerHeaderTitle/CartDrawerHeaderTitle';
import styles from './CartDrawerHeader.module.css';

/**
 * CartDrawerHeader
 *
 * Groups the heading and supporting controls for the cart experience.
 */
function CartDrawerHeader({ itemCount, onClose }) {
  return (
    <header className={styles.header}>
      <CartDrawerHeaderText>
        <CartDrawerHeaderEyebrow />
        <CartDrawerHeaderTitle />
        <CartDrawerHeaderItemCount itemCount={itemCount} />
      </CartDrawerHeaderText>
      <CartDrawerCloseButton onClick={onClose} />
    </header>
  );
}

export default CartDrawerHeader;
