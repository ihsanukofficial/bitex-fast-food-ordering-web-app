import { createProductCardInfoItems } from '../../../data/productInformationItems';
import ProductCardInfoItem from '../ProductCardInfoItem/ProductCardInfoItem';
import ProductCardInfoList from '../ProductCardInfoList/ProductCardInfoList';

/**
 * ProductCardInfo
 *
 * Derives compact preparation and spice metadata through the shared
 * product-information mapping.
 */
function ProductCardInfo({ preparationTime, spiceLevel }) {
  const items = createProductCardInfoItems({ preparationTime, spiceLevel });

  if (items.length === 0) return null;

  return (
    <ProductCardInfoList>
      {items.map((item) => (
        <ProductCardInfoItem
          key={item.label}
          icon={item.icon}
          label={item.label}
          value={item.value}
        />
      ))}
    </ProductCardInfoList>
  );
}

export default ProductCardInfo;
