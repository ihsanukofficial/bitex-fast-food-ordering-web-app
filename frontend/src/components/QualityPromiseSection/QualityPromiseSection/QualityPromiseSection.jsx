import Container from '../../Utils/Container/Container';
import QualityPromiseContent from '../QualityPromiseContent/QualityPromiseContent';
import QualityPromiseLayout from '../QualityPromiseLayout/QualityPromiseLayout';
import QualityPromiseVisual from '../QualityPromiseVisual/QualityPromiseVisual';
import styles from './QualityPromiseSection.module.css';

/**
 * QualityPromiseSection
 *
 * Composes the quality narrative and centralized promise definitions into a reusable
 * brand section.
 */
function QualityPromiseSection({ content }) {
  return (
    <section className={styles.section} aria-labelledby="quality-heading">
      <Container>
        <QualityPromiseLayout>
          <QualityPromiseContent
            eyebrow={content?.eyebrow}
            heading={content?.heading}
            description={content?.description}
            promises={content?.promises}
          />
          <QualityPromiseVisual
            image={content?.image}
            noteTitle={content?.note?.title}
            noteDescription={content?.note?.description}
          />
        </QualityPromiseLayout>
      </Container>
    </section>
  );
}

export default QualityPromiseSection;
