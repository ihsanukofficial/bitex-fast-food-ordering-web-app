import ProductDetailDiscountBadge from '../ProductDetailDiscountBadge/ProductDetailDiscountBadge';
import ProductDetailDiscountedPrice from '../ProductDetailDiscountedPrice/ProductDetailDiscountedPrice';
import ProductDetailOriginalPrice from '../ProductDetailOriginalPrice/ProductDetailOriginalPrice';
import styles from './ProductDetailPricing.module.css';

/**
 * ProductDetailPricing
 *
 * Presents original, discounted, and promotional price treatments from the currently
 * selected product price. For a variation product with no required selection made
 * yet, `price` is the cheapest option's price (isStartingPrice: true), so it's
 * labeled "Starting from" rather than presented as the final price.
 */
function ProductDetailPricing({ price }) {
  // A malformed product (no priced option resolvable) has no price to show — let the
  // page render everything else instead of crashing on a null dereference.
  if (!price) return null;
  const hasDiscount = price.discountPercentage > 0;

  return (
    <div className={styles.pricing}>
      {price.isStartingPrice && <span className={styles.startingFrom}>Starting from</span>}
      <ProductDetailOriginalPrice
        price={price.amount}
        hasDiscount={hasDiscount}
      />
      {hasDiscount && (
        <>
          <ProductDetailDiscountedPrice price={price.discountedPrice} />
          <ProductDetailDiscountBadge percentage={price.discountPercentage} />
        </>
      )}
    </div>
  );
}

export default ProductDetailPricing;
