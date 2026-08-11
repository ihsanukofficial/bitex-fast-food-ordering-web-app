import Icon from '../../Utils/Icon/Icon';
import ProductCardInfoLabel from '../ProductCardInfoLabel/ProductCardInfoLabel';
import ProductCardInfoText from '../ProductCardInfoText/ProductCardInfoText';
import ProductCardInfoValue from '../ProductCardInfoValue/ProductCardInfoValue';
import styles from './ProductCardInfoItem.module.css';

/**
 * ProductCardInfoItem
 *
 * Composes one semantic item within the product card collection.
 */
function ProductCardInfoItem({ icon, label, value }) {
  return (
    <div className={styles.item}>
      <Icon name={icon} size="0.95rem" color="#d71b1f" ariaLabel="" />
      <ProductCardInfoText>
        <ProductCardInfoLabel>{label}</ProductCardInfoLabel>
        <ProductCardInfoValue>{value}</ProductCardInfoValue>
      </ProductCardInfoText>
    </div>
  );
}

export default ProductCardInfoItem;
