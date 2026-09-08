import { useEditMode } from '../../../context/EditModeContext';
import { AddItemButton } from '../../Utils/Editable/EditableControls';
import EditableText from '../../Utils/Editable/EditableText';
import IngredientHighlight from '../IngredientHighlight/IngredientHighlight';
import styles from './IngredientHighlights.module.css';

const ACCENTS = ['red', 'yellow', 'dark'];
const MAX_HIGHLIGHTS = 3;

/**
 * IngredientHighlights
 *
 * Builds the concise fresh-ingredients highlights from shared content definitions.
 */
function IngredientHighlights({ highlights = [] }) {
  const edit = useEditMode();

  if (!edit) {
    return (
      <ul className={styles.list}>
        {highlights.map((highlight) => (
          <IngredientHighlight key={highlight.label} {...highlight} />
        ))}
      </ul>
    );
  }

  const setHighlights = (next) => edit.update('about', ['freshIngredients', 'highlights'], next);
  const updateHighlight = (index, changes) =>
    setHighlights(highlights.map((h, i) => (i === index ? { ...h, ...changes } : h)));

  return (
    <>
      <ul className={styles.list}>
        {highlights.map((highlight, index) => (
          <IngredientHighlight
            key={index}
            label={
              <EditableText
                page="about"
                path={['freshIngredients', 'highlights', index, 'label']}
                value={highlight.label}
              />
            }
            accent={highlight.accent}
            accentPicker={
              <select
                className={styles.accentSelect}
                value={highlight.accent}
                onChange={(event) => updateHighlight(index, { accent: event.target.value })}
              >
                {ACCENTS.map((accent) => (
                  <option key={accent} value={accent}>
                    {accent}
                  </option>
                ))}
              </select>
            }
            onRemove={() => setHighlights(highlights.filter((_, i) => i !== index))}
          />
        ))}
      </ul>
      {highlights.length < MAX_HIGHLIGHTS && (
        <AddItemButton onClick={() => setHighlights([...highlights, { label: 'New highlight', accent: 'red' }])}>
          Add highlight
        </AddItemButton>
      )}
    </>
  );
}

export default IngredientHighlights;
