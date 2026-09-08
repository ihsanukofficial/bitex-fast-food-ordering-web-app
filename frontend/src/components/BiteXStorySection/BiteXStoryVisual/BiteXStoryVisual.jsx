import EditableImage from '../../Utils/Editable/EditableImage';
import EditableText from '../../Utils/Editable/EditableText';
import BiteXStoryCaption from '../BiteXStoryCaption/BiteXStoryCaption';
import BiteXStoryImageFrame from '../BiteXStoryImageFrame/BiteXStoryImageFrame';
import styles from './BiteXStoryVisual.module.css';

/**
 * BiteXStoryVisual
 *
 * Composes the visual region of the BiteX story experience.
 */
function BiteXStoryVisual({ image, captionTitle, captionDescription }) {
  return (
    <figure className={styles.figure}>
      <EditableImage page="about" path={['story', 'image']}>
        <BiteXStoryImageFrame image={image} />
      </EditableImage>
      <BiteXStoryCaption
        title={<EditableText page="about" path={['story', 'caption', 'title']} value={captionTitle} />}
        description={
          <EditableText page="about" path={['story', 'caption', 'description']} value={captionDescription} />
        }
      />
    </figure>
  );
}

export default BiteXStoryVisual;
