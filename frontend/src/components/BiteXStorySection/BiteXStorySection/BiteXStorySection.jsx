import Container from '../../Utils/Container/Container';
import BiteXStoryContent from '../BiteXStoryContent/BiteXStoryContent';
import BiteXStoryLayout from '../BiteXStoryLayout/BiteXStoryLayout';
import BiteXStoryVisual from '../BiteXStoryVisual/BiteXStoryVisual';
import styles from './BiteXStorySection.module.css';

/**
 * BiteXStorySection
 *
 * Assembles the BiteX story section from focused content and presentation primitives.
 */
function BiteXStorySection({ content }) {
  return (
    <section className={styles.section} aria-labelledby="bitex-story-heading">
      <Container>
        <BiteXStoryLayout>
          <BiteXStoryContent
            eyebrow={content?.eyebrow}
            heading={content?.heading}
            lead={content?.lead}
            description={content?.description}
            stats={content?.stats}
          />
          <BiteXStoryVisual
            image={content?.image}
            captionTitle={content?.caption?.title}
            captionDescription={content?.caption?.description}
          />
        </BiteXStoryLayout>
      </Container>
    </section>
  );
}

export default BiteXStorySection;
