import ProductDetailAddonOption from '../ProductDetailAddonOption/ProductDetailAddonOption';
import ProductDetailAddonsFieldset from '../ProductDetailAddonsFieldset/ProductDetailAddonsFieldset';
import ProductDetailAddonsGrid from '../ProductDetailAddonsGrid/ProductDetailAddonsGrid';
import ProductDetailAddonsHeading from '../ProductDetailAddonsHeading/ProductDetailAddonsHeading';

/**
 * ProductDetailAddons
 *
 * Builds controlled add-on options from product data while leaving selection ownership
 * with the route.
 */
function ProductDetailAddons({ addons, selectedAddons, onChange }) {
  return (
    <ProductDetailAddonsFieldset>
      <ProductDetailAddonsHeading>Make it yours</ProductDetailAddonsHeading>
      <ProductDetailAddonsGrid>
        {addons.map((addon) => (
          <ProductDetailAddonOption
            key={addon.name}
            addon={addon}
            selected={selectedAddons.includes(addon.name)}
            onChange={onChange}
          />
        ))}
      </ProductDetailAddonsGrid>
    </ProductDetailAddonsFieldset>
  );
}

export default ProductDetailAddons;
