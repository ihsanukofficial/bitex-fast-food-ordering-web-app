import { createProductCardInfoItems } from '../../../data/productInformationItems';
import ProductCardInfoItem from '../ProductCardInfoItem/ProductCardInfoItem';

/**
 * ProductCardInfo
 *
 * Derives compact preparation and spice metadata through the shared
 * product-information mapping. Renders the chips directly (no wrapper of its own) so
 * they flow into the same meta row as ProductCardVariationStatus — see
 * ProductCardPurchaseMeta, the shared flex-wrap row both live in.
 */
function ProductCardInfo({ preparationTime, spiceLevel }) {
  const items = createProductCardInfoItems({ preparationTime, spiceLevel });

  return items.map((item) => (
    <ProductCardInfoItem key={item.label} icon={item.icon} label={item.label} value={item.value} />
  ));
}

export default ProductCardInfo;
