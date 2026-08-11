import DealsCatalogDealCard from '../DealsCatalogDealCard/DealsCatalogDealCard';
import DealsCatalogGrid from '../DealsCatalogGrid/DealsCatalogGrid';
import DealsCatalogGroupCount from '../DealsCatalogGroupCount/DealsCatalogGroupCount';
import DealsCatalogGroupEyebrow from '../DealsCatalogGroupEyebrow/DealsCatalogGroupEyebrow';
import DealsCatalogGroupHeader from '../DealsCatalogGroupHeader/DealsCatalogGroupHeader';
import DealsCatalogGroupHeading from '../DealsCatalogGroupHeading/DealsCatalogGroupHeading';
import DealsCatalogGroupIcon from '../DealsCatalogGroupIcon/DealsCatalogGroupIcon';
import DealsCatalogGroupShell from '../DealsCatalogGroupShell/DealsCatalogGroupShell';
import DealsCatalogGroupTitle from '../DealsCatalogGroupTitle/DealsCatalogGroupTitle';

/**
 * DealsCatalogGroup
 *
 * Renders one themed deal collection while preserving section-level labeling for
 * accessibility and navigation.
 */
function DealsCatalogGroup({
  section,
  icon,
  eyebrow,
  accent,
  tint,
}) {
  return (
    <DealsCatalogGroupShell
      id={section.id}
      titleId={`${section.id}-title`}
      accent={accent}
      tint={tint}
    >
      <DealsCatalogGroupHeader>
        <DealsCatalogGroupIcon icon={icon} />
        <DealsCatalogGroupHeading>
          <DealsCatalogGroupEyebrow>{eyebrow}</DealsCatalogGroupEyebrow>
          <DealsCatalogGroupTitle id={`${section.id}-title`}>
            {section.title}
          </DealsCatalogGroupTitle>
        </DealsCatalogGroupHeading>
        <DealsCatalogGroupCount count={section.deals.length} />
      </DealsCatalogGroupHeader>

      <DealsCatalogGrid>
        {section.deals.map((deal) => (
          <DealsCatalogDealCard
            key={deal.id}
            deal={deal}
            categoryLabel={section.title}
            accent={accent}
          />
        ))}
      </DealsCatalogGrid>
    </DealsCatalogGroupShell>
  );
}

export default DealsCatalogGroup;
