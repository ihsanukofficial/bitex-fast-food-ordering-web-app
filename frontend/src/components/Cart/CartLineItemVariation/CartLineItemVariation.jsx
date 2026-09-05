import styles from './CartLineItemVariation.module.css';

/**
 * CartLineItemVariation
 *
 * Pairs one selected variation name with its resolved option.
 */
function CartLineItemVariation({ name, option }) {
  return (
    <li>
      <span className={styles.label}>{name}:</span> {option}
    </li>
  );
}

export default CartLineItemVariation;
