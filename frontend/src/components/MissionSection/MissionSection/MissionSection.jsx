import Container from '../../Utils/Container/Container';
import EditableText from '../../Utils/Editable/EditableText';
import MissionContent from '../MissionContent/MissionContent';
import MissionSectionLayout from '../MissionSectionLayout/MissionSectionLayout';
import MissionValuesGrid from '../MissionValuesGrid/MissionValuesGrid';
import styles from './MissionSection.module.css';

/**
 * MissionSection
 *
 * Composes the brand mission narrative and value cards from centralized content
 * definitions.
 */
function MissionSection({ content }) {
  return (
    <section className={styles.section} aria-labelledby="mission-heading">
      <Container>
        <MissionSectionLayout>
          <MissionContent
            eyebrow={<EditableText page="about" path={['mission', 'eyebrow']} value={content?.eyebrow} />}
            heading={<EditableText page="about" path={['mission', 'heading']} value={content?.heading} />}
            description={<EditableText page="about" path={['mission', 'intro']} value={content?.intro} />}
          />
          <MissionValuesGrid values={content?.values} />
        </MissionSectionLayout>
      </Container>
    </section>
  );
}

export default MissionSection;
