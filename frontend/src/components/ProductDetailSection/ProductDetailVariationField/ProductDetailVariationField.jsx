import { useId } from 'react';
import CustomDropdown from '../../Utils/CustomDropdown/CustomDropdown';
import styles from './ProductDetailVariationField.module.css';

/**
 * ProductDetailVariationField
 *
 * Adapts one catalog variation to the shared dropdown and reports selection changes to
 * the route owner.
 */
function ProductDetailVariationField({ variation, value, onChange }) {
  const labelId = useId();

  return (
    <div className={styles.variation}>
      <span id={labelId} className={styles.label}>
        {variation.name}
        {variation.required && <span aria-hidden="true"> *</span>}
      </span>
      <CustomDropdown
        options={variation.options.map((option) => option.label)}
        value={value}
        placeholder={`Select ${variation.name.toLowerCase()}`}
        onChange={(event) => onChange(variation.name, event.target.value)}
        ariaLabelledBy={labelId}
      />
    </div>
  );
}

export default ProductDetailVariationField;
