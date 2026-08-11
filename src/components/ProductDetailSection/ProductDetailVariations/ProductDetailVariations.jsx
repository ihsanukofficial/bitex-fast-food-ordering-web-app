import ProductDetailVariationField from '../ProductDetailVariationField/ProductDetailVariationField';
import styles from './ProductDetailVariations.module.css';

/**
 * ProductDetailVariations
 *
 * Builds controlled selectors for each product variation while preserving the
 * catalog-defined order and requirements.
 */
function ProductDetailVariations({ variations, selections, onChange }) {
  return (
    <div className={styles.variations}>
      {variations.map((variation) => (
        <ProductDetailVariationField
          key={variation.name}
          variation={variation}
          value={selections[variation.name]}
          onChange={onChange}
        />
      ))}
    </div>
  );
}

export default ProductDetailVariations;
