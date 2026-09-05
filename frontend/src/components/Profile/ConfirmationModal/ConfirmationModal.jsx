import { useRef } from 'react';
import useFocusTrap from '../../../hooks/useFocusTrap';
import styles from './ConfirmationModal.module.css';

/**
 * ConfirmationModal
 *
 * Blocks a destructive action (deleting a review, etc.) behind an explicit confirm
 * step, focus-trapped like the site's other overlays so it's fully keyboard operable.
 */
function ConfirmationModal({
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDanger = true,
  isConfirming = false,
  onConfirm,
  onCancel,
}) {
  const dialogRef = useRef(null);

  useFocusTrap({ containerRef: dialogRef, isActive: true, onEscape: onCancel });

  return (
    <div className={styles.backdrop} onMouseDown={onCancel}>
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirmation-modal-title"
        tabIndex={-1}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h2 id="confirmation-modal-title" className={styles.title}>
          {title}
        </h2>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          <button type="button" className={styles.cancelButton} onClick={onCancel}>
            {cancelLabel}
          </button>
          <button
            type="button"
            className={isDanger ? styles.dangerButton : styles.confirmButton}
            onClick={onConfirm}
            disabled={isConfirming}
          >
            {isConfirming ? 'Please wait…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
