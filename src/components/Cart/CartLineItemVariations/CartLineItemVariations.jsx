import CartLineItemVariation from '../CartLineItemVariation/CartLineItemVariation';
import styles from './CartLineItemVariations.module.css';

/**
 * CartLineItemVariations
 *
 * Groups configured variation details for one cart entry.
 */
function CartLineItemVariations({ variations }) {
  if (variations.length === 0) return null;

  return (
    <ul className={styles.list} aria-label="Selected variations">
      {variations.map((variation) => (
        <CartLineItemVariation
          key={`${variation.variationId}-${variation.optionId}`}
          name={variation.variationId}
          option={variation.optionId}
        />
      ))}
    </ul>
  );
}

export default CartLineItemVariations;
