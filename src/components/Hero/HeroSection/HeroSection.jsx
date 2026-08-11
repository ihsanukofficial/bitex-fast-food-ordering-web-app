import Container from '../../Utils/Container/Container';
import DiscoverOurMenuBtn from '../../Utils/Button/DiscoverOurMenuBtn/DiscoverOurMenuBtn';
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
const HeroSection = () => {
  return (
    <HeroShell>
      <Container>
        <HeroContent>
          <HeroTextBlock>
            <HeroEyebrow />
            <Headline />
            <SubHeadline />
            <DiscoverOurMenuBtn />
            <HeroHighlights />
          </HeroTextBlock>
          <HeroImageGallery />
        </HeroContent>
      </Container>
    </HeroShell>
  );
};

export default HeroSection;
