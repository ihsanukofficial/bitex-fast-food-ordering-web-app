import Icon from '../../Utils/Icon/Icon';
import styles from './ProductDetailInformationItem.module.css';

/**
 * ProductDetailInformationItem
 *
 * Composes one semantic metadata item within the product-detail experience.
 */
function ProductDetailInformationItem({ icon, label, value }) {
  return (
    <div className={styles.item}>
      <Icon name={icon} color="#d71b1f" ariaLabel="" />
      <span>
        <strong>{label}</strong>
        <small>{value}</small>
      </span>
    </div>
  );
}

export default ProductDetailInformationItem;
