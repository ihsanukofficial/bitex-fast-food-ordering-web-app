import { useRef } from 'react';
import useImageEntranceAnimations from '../../../hooks/useImageEntranceAnimations';
import Container from '../../Utils/Container/Container';
import FooterBrandColumn from '../FooterBrandColumn/FooterBrandColumn';
import FooterBrandDescription from '../FooterBrandDescription/FooterBrandDescription';
import FooterBrandLogo from '../FooterBrandLogo/FooterBrandLogo';
import FooterColumns from '../FooterColumns/FooterColumns';
import FooterContactColumn from '../FooterContactColumn/FooterContactColumn';
import FooterContactDetails from '../FooterContactDetails/FooterContactDetails';
import FooterContent from '../FooterContent/FooterContent';
import FooterCopyrightBar from '../FooterCopyrightBar/FooterCopyrightBar';
import FooterBackground from '../FooterBackground/FooterBackground';
import FooterMenuLinks from '../FooterMenuLinks/FooterMenuLinks';
import FooterMenuLinksColumn from '../FooterMenuLinksColumn/FooterMenuLinksColumn';
import FooterQuickLinks from '../FooterQuickLinks/FooterQuickLinks';
import FooterQuickLinksColumn from '../FooterQuickLinksColumn/FooterQuickLinksColumn';
import FooterSocialLinks from '../FooterSocialLinks/FooterSocialLinks';
import FooterWorkingHours from '../FooterWorkingHours/FooterWorkingHours';

/**
 * SiteFooter
 *
 * Composes site-wide brand, navigation, contact, social, and operating-hours
 * information from focused columns.
 */
function SiteFooter() {
  const footerRef = useRef(null);

  useImageEntranceAnimations(footerRef);

  return (
    <FooterBackground footerRef={footerRef}>
      <Container>
        <FooterContent>
          <FooterColumns>
            <FooterBrandColumn>
              <FooterBrandLogo />
              <FooterBrandDescription />
              <FooterSocialLinks />
            </FooterBrandColumn>
            <FooterQuickLinksColumn>
              <FooterQuickLinks />
            </FooterQuickLinksColumn>
            <FooterMenuLinksColumn>
              <FooterMenuLinks />
            </FooterMenuLinksColumn>
            <FooterContactColumn>
              <FooterContactDetails />
              <FooterWorkingHours />
            </FooterContactColumn>
          </FooterColumns>
          <FooterCopyrightBar />
        </FooterContent>
      </Container>
    </FooterBackground>
  );
}

export default SiteFooter;
