import { createProductDetailInformationItems } from '../../../data/productInformationItems';
import ProductDetailInformationItem from '../ProductDetailInformationItem/ProductDetailInformationItem';
import styles from './ProductDetailInformation.module.css';

/**
 * ProductDetailInformation
 *
 * Derives display-ready product metadata through the shared information-field mapping.
 */
function ProductDetailInformation({ product }) {
  const items = createProductDetailInformationItems(product);

  if (items.length === 0) return null;

  return (
    <section className={styles.info} aria-label="Product information">
      {items.map((item) => (
        <ProductDetailInformationItem
          key={item.label}
          icon={item.icon}
          label={item.label}
          value={item.value}
        />
      ))}
    </section>
  );
}

export default ProductDetailInformation;
