import Container from '../../Utils/Container/Container';
import DiscoverOurMenuBtn from '../../Utils/Button/DiscoverOurMenuBtn/DiscoverOurMenuBtn';
import EditableText from '../../Utils/Editable/EditableText';
import Headline from '../Headline/Headline';
import HeroContent from '../HeroContent/HeroContent';
import HeroEyebrow from '../HeroEyebrow/HeroEyebrow';
import HeroHighlights from '../HeroHighlights/HeroHighlights';
import HeroImageGallery from '../HeroImageGallery/HeroImageGallery';
import HeroShell from '../HeroShell/HeroShell';
import HeroTextBlock from '../HeroTextBlock/HeroTextBlock';
import SubHeadline from '../SubHeadline/SubHeadline';

/**
 * HeroSection
 *
 * Composes the homepage value proposition, primary actions, highlights, and
 * promotional imagery.
 */
const HeroSection = ({ eyebrow, headline, subHeadline, highlights, images }) => {
  return (
    <HeroShell>
      <Container>
        <HeroContent>
          <HeroTextBlock>
            <HeroEyebrow>
              <EditableText page="home" path={['hero', 'eyebrow']} value={eyebrow} />
            </HeroEyebrow>
            <Headline>{headline}</Headline>
            <SubHeadline>
              <EditableText page="home" path={['hero', 'subHeadline']} value={subHeadline} />
            </SubHeadline>
            <DiscoverOurMenuBtn />
            <HeroHighlights highlights={highlights} />
          </HeroTextBlock>
          <HeroImageGallery images={images} />
        </HeroContent>
      </Container>
    </HeroShell>
  );
};

export default HeroSection;
