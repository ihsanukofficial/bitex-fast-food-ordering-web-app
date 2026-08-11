import Container from '../../Utils/Container/Container';
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
function MissionSection() {
  return (
    <section className={styles.section} aria-labelledby="mission-heading">
      <Container>
        <MissionSectionLayout>
          <MissionContent />
          <MissionValuesGrid />
        </MissionSectionLayout>
      </Container>
    </section>
  );
}

export default MissionSection;
