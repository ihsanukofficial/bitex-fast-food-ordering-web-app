import Container from '../../Utils/Container/Container';
import EditableText from '../../Utils/Editable/EditableText';
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
            eyebrow={<EditableText page="about" path={['story', 'eyebrow']} value={content?.eyebrow} />}
            heading={<EditableText page="about" path={['story', 'heading']} value={content?.heading} />}
            lead={<EditableText page="about" path={['story', 'lead']} value={content?.lead} />}
            description={
              <EditableText page="about" path={['story', 'description']} value={content?.description} />
            }
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
