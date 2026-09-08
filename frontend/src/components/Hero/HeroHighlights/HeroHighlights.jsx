import { useEditMode } from '../../../context/EditModeContext';
import EditableText from '../../Utils/Editable/EditableText';
import styles from './HeroHighlights.module.css';

/**
 * HeroHighlights
 *
 * Builds the concise homepage hero highlights from shared content definitions. These
 * are three fixed slots in the hero layout, not a free-form list — editing swaps each
 * one's text in place, with no add/remove.
 */
function HeroHighlights({ highlights = [] }) {
  const edit = useEditMode();

  if (!edit) {
    return (
      <div className={styles.highlights} aria-label="BiteX highlights">
        {highlights.map((highlight) => (
          <span key={highlight}>{highlight}</span>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.highlights} aria-label="BiteX highlights">
      {highlights.map((highlight, index) => (
        <EditableText key={index} page="home" path={['hero', 'highlights', index]} value={highlight} />
      ))}
    </div>
  );
}

export default HeroHighlights;
