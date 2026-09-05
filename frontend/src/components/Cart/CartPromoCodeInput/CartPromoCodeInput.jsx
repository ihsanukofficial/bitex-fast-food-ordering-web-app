import styles from './CartPromoCodeInput.module.css';

/**
 * CartPromoCodeInput
 *
 * Provides the controlled Cart Promo Code Input field with feature-specific
 * presentation.
 */
function CartPromoCodeInput({ id, value, placeholder, onChange }) {
  return (
    <input
      className={styles.input}
      id={id}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

export default CartPromoCodeInput;
