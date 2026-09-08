import { useRef, useState } from 'react';
import HighlightedText from '../HighlightedText/HighlightedText';
import { useEditMode } from '../../../context/EditModeContext';
import styles from './Editable.module.css';

/**
 * EditableText
 *
 * Renders `value` as plain text when there's no live-editor session (the public
 * site's exact current behavior — safe to use as `children` anywhere a component
 * already does `{someString}`), and as an in-place editable span when rendered
 * inside AdminLiveEditor. Editing is uncontrolled (a ref, not React state) so
 * keystrokes never fight React's render cycle; the value is only committed back to
 * the shared edit session on blur.
 */
function EditableText({ page, path, value, as = 'span', className, placeholder = 'Click to edit' }) {
  const edit = useEditMode();

  if (!edit) return value ?? null;

  return (
    <EditableField
      as={as}
      className={className}
      value={value || ''}
      placeholder={placeholder}
      onCommit={(next) => edit.update(page, path, next)}
    />
  );
}

/**
 * EditableHighlightedText
 *
 * Same contract as EditableText, but for the two headings whose display mode wraps
 * a *word* in red (see HighlightedText) — shows the parsed, styled result when idle
 * and the raw *asterisk* source only while actively being edited.
 */
export function EditableHighlightedText({ page, path, value, as = 'span', className }) {
  const edit = useEditMode();

  if (!edit) return <HighlightedText text={value} />;

  return (
    <EditableField
      as={as}
      className={className}
      value={value || ''}
      placeholder="Click to edit"
      onCommit={(next) => edit.update(page, path, next)}
      renderIdle={(current) => <HighlightedText text={current} />}
    />
  );
}

function EditableField({ as: Tag, className, value, placeholder, onCommit, renderIdle }) {
  const ref = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const commit = () => {
    const next = ref.current?.textContent ?? '';
    setIsFocused(false);
    if (next !== value) onCommit(next);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      if (ref.current) ref.current.textContent = value;
      ref.current?.blur();
    } else if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      ref.current?.blur();
    }
  };

  // While idle, a highlighted field shows its parsed *word* markup (renderIdle); the
  // instant it's focused this swaps to the raw editable source so what's typed is
  // exactly what gets saved, then swaps back on blur.
  const showRaw = isFocused || !renderIdle;

  return (
    <Tag
      ref={ref}
      className={`${className || ''} ${styles.editableText}`.trim()}
      contentEditable
      suppressContentEditableWarning
      role="textbox"
      aria-multiline="false"
      data-placeholder={placeholder}
      onFocus={() => setIsFocused(true)}
      onBlur={commit}
      onKeyDown={handleKeyDown}
    >
      {showRaw ? value : renderIdle(value)}
    </Tag>
  );
}

export default EditableText;
