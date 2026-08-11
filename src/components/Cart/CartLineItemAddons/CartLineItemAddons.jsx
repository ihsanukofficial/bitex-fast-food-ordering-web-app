import styles from './CartLineItemAddons.module.css';

/**
 * CartLineItemAddons
 *
 * Groups selected add-ons for one cart entry.
 */
function CartLineItemAddons({ addons }) {
  if (addons.length === 0) return null;

  return (
    <p className={styles.addons}>
      <strong>Add-ons:</strong>{' '}
      {addons.map((addon) => addon.addonId).join(', ')}
    </p>
  );
}

export default CartLineItemAddons;
