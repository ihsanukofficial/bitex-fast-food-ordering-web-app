import ProductDetailDiscountBadge from '../ProductDetailDiscountBadge/ProductDetailDiscountBadge';
import ProductDetailDiscountedPrice from '../ProductDetailDiscountedPrice/ProductDetailDiscountedPrice';
import ProductDetailOriginalPrice from '../ProductDetailOriginalPrice/ProductDetailOriginalPrice';
import styles from './ProductDetailPricing.module.css';

/**
 * ProductDetailPricing
 *
 * Presents original, discounted, and promotional price treatments from the currently
 * selected product price.
 */
function ProductDetailPricing({ price }) {
  const hasDiscount = price.discountPercentage > 0;

  return (
    <div className={styles.pricing}>
      <ProductDetailOriginalPrice
        price={price.originalPrice}
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
