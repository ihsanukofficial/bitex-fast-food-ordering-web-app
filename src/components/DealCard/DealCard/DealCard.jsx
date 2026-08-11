import defaultDealImage from '../../../assets/gallery/5.webp';
import DealCardAddToCartButton from '../DealCardAddToCartButton/DealCardAddToCartButton';
import DealCardCategoryBadge from '../DealCardCategoryBadge/DealCardCategoryBadge';
import DealCardContent from '../DealCardContent/DealCardContent';
import DealCardImage from '../DealCardImage/DealCardImage';
import DealCardImageFrame from '../DealCardImageFrame/DealCardImageFrame';
import DealCardItemsList from '../DealCardItemsList/DealCardItemsList';
import DealCardMedia from '../DealCardMedia/DealCardMedia';
import DealCardPrice from '../DealCardPrice/DealCardPrice';
import DealCardPurchaseArea from '../DealCardPurchaseArea/DealCardPurchaseArea';
import DealCardShell from '../DealCardShell/DealCardShell';
import DealCardTitle from '../DealCardTitle/DealCardTitle';

/**
 * DealCard
 *
 * Presents a reusable deal summary while keeping selection behavior optional for
 * non-purchasable contexts.
 */
function DealCard({
  image = defaultDealImage,
  title = 'Signature Deal',
  items = [],
  price = null,
  categoryLabel,
  accent = '#d71b1f',
  onSelect,
}) {
  const hasPrice = price !== null && price !== undefined;

  return (
    <DealCardShell accent={accent}>
      <DealCardMedia>
        <DealCardImageFrame>
          <DealCardImage src={image} alt={title} />
        </DealCardImageFrame>
        <DealCardCategoryBadge categoryLabel={categoryLabel} />
      </DealCardMedia>

      <DealCardContent>
        <DealCardTitle>{title}</DealCardTitle>
        <DealCardItemsList items={items} />
        <DealCardPurchaseArea>
          <DealCardPrice price={price} />
          {onSelect && (
            <DealCardAddToCartButton
              disabled={!hasPrice}
              onClick={onSelect}
              label={hasPrice ? 'Add to Cart' : 'Price Coming Soon'}
            />
          )}
        </DealCardPurchaseArea>
      </DealCardContent>
    </DealCardShell>
  );
}

export default DealCard;
