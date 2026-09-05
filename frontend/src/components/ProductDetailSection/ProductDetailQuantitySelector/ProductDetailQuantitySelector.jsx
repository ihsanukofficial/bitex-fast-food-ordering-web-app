import { MAX_CART_ITEM_QUANTITY } from '../../../utils/cartConstants';
import ProductDetailQuantityButton from '../ProductDetailQuantityButton/ProductDetailQuantityButton';
import ProductDetailQuantityControls from '../ProductDetailQuantityControls/ProductDetailQuantityControls';
import ProductDetailQuantityLabel from '../ProductDetailQuantityLabel/ProductDetailQuantityLabel';
import ProductDetailQuantityValue from '../ProductDetailQuantityValue/ProductDetailQuantityValue';
import styles from './ProductDetailQuantitySelector.module.css';

/**
 * ProductDetailQuantitySelector
 *
 * Constrains quantity changes to supported order limits before forwarding them to the
 * route owner.
 */
function ProductDetailQuantitySelector({ quantity, onChange }) {
  return (
    <div className={styles.container}>
      <ProductDetailQuantityLabel />
      <ProductDetailQuantityControls>
        <ProductDetailQuantityButton
          operation="decrease"
          onClick={() => onChange(quantity - 1)}
          disabled={quantity <= 1}
        />
        <ProductDetailQuantityValue quantity={quantity} />
        <ProductDetailQuantityButton
          operation="increase"
          onClick={() => onChange(quantity + 1)}
          disabled={quantity >= MAX_CART_ITEM_QUANTITY}
        />
      </ProductDetailQuantityControls>
    </div>
  );
}

export default ProductDetailQuantitySelector;
