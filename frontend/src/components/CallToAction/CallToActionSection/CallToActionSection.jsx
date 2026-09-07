import Container from '../../Utils/Container/Container';
import CallToActionActions from '../CallToActionActions/CallToActionActions';
import CallToActionBackground from '../CallToActionBackground/CallToActionBackground';
import CallToActionDescription from '../CallToActionDescription/CallToActionDescription';
import CallToActionHeading from '../CallToActionHeading/CallToActionHeading';
import CallToActionPanel from '../CallToActionPanel/CallToActionPanel';

/**
 * CallToActionSection
 *
 * Assembles the call-to-action section from focused content and presentation
 * primitives.
 */
function CallToActionSection({ content }) {
  return (
    <CallToActionBackground>
      <Container>
        <CallToActionPanel>
          <CallToActionHeading>{content?.heading}</CallToActionHeading>
          <CallToActionDescription>{content?.description}</CallToActionDescription>
          <CallToActionActions />
        </CallToActionPanel>
      </Container>
    </CallToActionBackground>
  );
}

export default CallToActionSection;
