import ProductCardCurrentPrice from '../ProductCardCurrentPrice/ProductCardCurrentPrice';
import ProductCardOriginalPrice from '../ProductCardOriginalPrice/ProductCardOriginalPrice';
import styles from './ProductCardPricing.module.css';

/**
 * ProductCardPricing
 *
 * Presents current and original prices while omitting the original amount when no
 * comparison is meaningful.
 */
function ProductCardPricing({ currentPrice, originalPrice }) {
  return (
    <div className={styles.pricing}>
      <ProductCardCurrentPrice>{currentPrice}</ProductCardCurrentPrice>
      {originalPrice && (
        <ProductCardOriginalPrice>{originalPrice}</ProductCardOriginalPrice>
      )}
    </div>
  );
}

export default ProductCardPricing;
