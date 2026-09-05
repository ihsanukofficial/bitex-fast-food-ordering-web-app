import styles from './DealDetailSpecialInstructions.module.css';

const MAX_LENGTH = 200;

/**
 * DealDetailSpecialInstructions
 *
 * Provides a controlled optional note field without taking ownership of order
 * instructions.
 */
function DealDetailSpecialInstructions({ value, onChange }) {
  return (
    <label className={styles.container}>
      <span className={styles.heading}>
        Special instructions <span className={styles.optional}>(optional)</span>
      </span>
      <textarea
        className={styles.textarea}
        value={value}
        maxLength={MAX_LENGTH}
        rows="4"
        placeholder="Cooking preferences, allergies, or serving requests..."
        onChange={(event) => onChange(event.target.value)}
      />
      <span className={styles.counter} aria-live="polite">
        {value.length}/{MAX_LENGTH}
      </span>
    </label>
  );
}

export default DealDetailSpecialInstructions;
