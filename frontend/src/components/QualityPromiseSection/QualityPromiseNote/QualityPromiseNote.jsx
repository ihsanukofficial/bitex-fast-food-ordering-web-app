import QualityPromiseNoteDescription from '../QualityPromiseNoteDescription/QualityPromiseNoteDescription';
import QualityPromiseNoteTitle from '../QualityPromiseNoteTitle/QualityPromiseNoteTitle';
import styles from './QualityPromiseNote.module.css';

/**
 * QualityPromiseNote
 *
 * Provides supporting context that completes the quality promise message.
 */
function QualityPromiseNote() {
  return (
    <p className={styles.note}>
      <QualityPromiseNoteTitle />
      <QualityPromiseNoteDescription />
    </p>
  );
}

export default QualityPromiseNote;
