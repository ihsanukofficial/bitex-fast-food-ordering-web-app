import deals from '../../../data/deals';
import Container from '../../Utils/Container/Container';
import DealsCatalogCollection from '../DealsCatalogCollection/DealsCatalogCollection';
import DealsCatalogGroup from '../DealsCatalogGroup/DealsCatalogGroup';
import DealsCatalogShell from '../DealsCatalogShell/DealsCatalogShell';

/**
 * DealsCatalogSection
 *
 * Composes all configured deal groups directly from the shared deals data source.
 */
function DealsCatalogSection() {
  return (
    <DealsCatalogShell>
      <Container>
        <DealsCatalogCollection>
          {deals.map((section) => (
            <DealsCatalogGroup
              key={section.id}
              section={section}
              accent={section.accent}
              tint={section.tint}
              icon={section.icon}
              eyebrow={section.eyebrow}
            />
          ))}
        </DealsCatalogCollection>
      </Container>
    </DealsCatalogShell>
  );
}

export default DealsCatalogSection;
