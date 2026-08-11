import deals from '../../../data/deals';
import Container from '../../Utils/Container/Container';
import DealsHeroCopy from '../DealsHeroCopy/DealsHeroCopy';
import DealsHeroDescription from '../DealsHeroDescription/DealsHeroDescription';
import DealsHeroEyebrow from '../DealsHeroEyebrow/DealsHeroEyebrow';
import DealsHeroHeading from '../DealsHeroHeading/DealsHeroHeading';
import DealsHeroHeadingAccent from '../DealsHeroHeadingAccent/DealsHeroHeadingAccent';
import DealsHeroLayout from '../DealsHeroLayout/DealsHeroLayout';
import DealsHeroNavigation from '../DealsHeroNavigation/DealsHeroNavigation';
import DealsHeroNavigationArrow from '../DealsHeroNavigationArrow/DealsHeroNavigationArrow';
import DealsHeroNavigationCard from '../DealsHeroNavigationCard/DealsHeroNavigationCard';
import DealsHeroNavigationIcon from '../DealsHeroNavigationIcon/DealsHeroNavigationIcon';
import DealsHeroNavigationLabel from '../DealsHeroNavigationLabel/DealsHeroNavigationLabel';
import DealsHeroNavigationText from '../DealsHeroNavigationText/DealsHeroNavigationText';
import DealsHeroNavigationTitle from '../DealsHeroNavigationTitle/DealsHeroNavigationTitle';
import DealsHeroShell from '../DealsHeroShell/DealsHeroShell';

/**
 * DealsHeroSection
 *
 * Builds the deals introduction and section navigation from shared deal metadata to
 * prevent content drift.
 */
function DealsHeroSection() {
  return (
    <DealsHeroShell>
      <Container>
        <DealsHeroLayout>
          <DealsHeroCopy>
            <DealsHeroEyebrow>BiteX signature savings</DealsHeroEyebrow>
            <DealsHeroHeading>
              More flavor.
              <DealsHeroHeadingAccent>
                {' '}Better value.
              </DealsHeroHeadingAccent>
            </DealsHeroHeading>
            <DealsHeroDescription>
              From quick pizza bundles to full family feasts, find a combo
              built for every appetite and every table.
            </DealsHeroDescription>
          </DealsHeroCopy>

          <DealsHeroNavigation>
            {deals.map((section) => (
              <DealsHeroNavigationCard
                key={section.id}
                href={`#${section.id}`}
                accent={section.navigationAccent}
              >
                <DealsHeroNavigationIcon icon={section.icon} />
                <DealsHeroNavigationText>
                  <DealsHeroNavigationLabel />
                  <DealsHeroNavigationTitle>
                    {section.navigationLabel}
                  </DealsHeroNavigationTitle>
                </DealsHeroNavigationText>
                <DealsHeroNavigationArrow />
              </DealsHeroNavigationCard>
            ))}
          </DealsHeroNavigation>
        </DealsHeroLayout>
      </Container>
    </DealsHeroShell>
  );
}

export default DealsHeroSection;
