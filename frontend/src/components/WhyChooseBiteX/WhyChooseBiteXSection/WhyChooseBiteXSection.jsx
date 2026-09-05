import PageContainer from '../../Utils/Container/Container';
import WhyChooseBiteXBackground from '../WhyChooseBiteXBackground/WhyChooseBiteXBackground';
import WhyChooseBiteXClosingStatement from '../WhyChooseBiteXClosingStatement/WhyChooseBiteXClosingStatement';
import WhyChooseBiteXContent from '../WhyChooseBiteXContent/WhyChooseBiteXContent';
import WhyChooseBiteXHeading from '../WhyChooseBiteXHeading/WhyChooseBiteXHeading';
import WhyChooseBiteXHeadingLogo from '../WhyChooseBiteXHeadingLogo/WhyChooseBiteXHeadingLogo';
import WhyChooseBiteXHeadingQuestion from '../WhyChooseBiteXHeadingQuestion/WhyChooseBiteXHeadingQuestion';
import WhyChooseBiteXHeadingText from '../WhyChooseBiteXHeadingText/WhyChooseBiteXHeadingText';
import WhyChooseBiteXReasonsList from '../WhyChooseBiteXReasonsList/WhyChooseBiteXReasonsList';

/**
 * WhyChooseBiteXSection
 *
 * Composes the brand differentiators from centralized reason data and focused
 * presentation primitives.
 */
function WhyChooseBiteXSection({ content }) {
  return (
    <WhyChooseBiteXBackground>
      <PageContainer>
        <WhyChooseBiteXContent>
          <WhyChooseBiteXHeading>
            <WhyChooseBiteXHeadingText />
            <WhyChooseBiteXHeadingLogo />
            <WhyChooseBiteXHeadingQuestion />
          </WhyChooseBiteXHeading>
          <WhyChooseBiteXReasonsList reasons={content?.reasons || []} />
          <WhyChooseBiteXClosingStatement>
            {content?.closingStatement || 'BiteX – Where Every Bite Brings Happiness!'}
          </WhyChooseBiteXClosingStatement>
        </WhyChooseBiteXContent>
      </PageContainer>
    </WhyChooseBiteXBackground>
  );
}

export default WhyChooseBiteXSection;
