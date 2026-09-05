import ProductDetailReviews from '../../ProductDetailSection/ProductDetailReviews/ProductDetailReviews';
import DealDetailAddToCartButton from '../DealDetailAddToCartButton/DealDetailAddToCartButton';
import DealDetailContentPanel from '../DealDetailContentPanel/DealDetailContentPanel';
import DealDetailGallery from '../DealDetailGallery/DealDetailGallery';
import DealDetailGalleryPanel from '../DealDetailGalleryPanel/DealDetailGalleryPanel';
import DealDetailIncludes from '../DealDetailIncludes/DealDetailIncludes';
import DealDetailLayout from '../DealDetailLayout/DealDetailLayout';
import DealDetailPrice from '../DealDetailPrice/DealDetailPrice';
import DealDetailProductTabs from '../DealDetailProductTabs/DealDetailProductTabs';
import DealDetailQuantitySelector from '../DealDetailQuantitySelector/DealDetailQuantitySelector';
import DealDetailSpecialInstructions from '../DealDetailSpecialInstructions/DealDetailSpecialInstructions';
import DealDetailTitle from '../DealDetailTitle/DealDetailTitle';

/**
 * DealDetailSection
 *
 * Composes the deal's gallery and purchase controls; quantity/total/instructions state
 * remains owned by the route.
 */
function DealDetailSection({
  deal,
  quantity,
  total,
  specialInstructions,
  onQuantityChange,
  onInstructionsChange,
  onAddToCart,
}) {
  return (
    <DealDetailLayout>
      <DealDetailGalleryPanel>
        <DealDetailGallery image={deal.image} title={deal.name} items={deal.items} />
      </DealDetailGalleryPanel>

      <DealDetailContentPanel>
        <DealDetailTitle>{deal.name}</DealDetailTitle>
        <DealDetailPrice price={deal.price} />
        <DealDetailIncludes items={deal.items} />
        <DealDetailProductTabs items={deal.items} />
        <DealDetailSpecialInstructions value={specialInstructions} onChange={onInstructionsChange} />
        <DealDetailQuantitySelector quantity={quantity} onChange={onQuantityChange} />
        <DealDetailAddToCartButton total={total} onClick={onAddToCart} />
        {deal.ratings?.reviews?.length > 0 && <ProductDetailReviews reviews={deal.ratings.reviews} />}
      </DealDetailContentPanel>
    </DealDetailLayout>
  );
}

export default DealDetailSection;
