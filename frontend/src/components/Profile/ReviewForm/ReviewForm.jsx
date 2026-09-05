import { useState } from 'react';
import StarRatingInput from '../StarRatingInput/StarRatingInput';
import styles from './ReviewForm.module.css';

/**
 * ReviewForm
 *
 * Shared star-rating + text form for both writing a new review and editing an
 * existing one. `onSubmit` does the actual API call (POST vs PUT differs by caller);
 * this component only owns the input state and the submit/error/loading UI around it.
 */
function ReviewForm({ productTitle, initialStars = 0, initialText = '', submitLabel, onSubmit, onCancel }) {
  const [stars, setStars] = useState(initialStars);
  const [text, setText] = useState(initialText);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (stars === 0) {
      setError('Please select a star rating.');
      return;
    }

    setError('');
    setIsSubmitting(true);
    try {
      await onSubmit({ stars, text });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <StarRatingInput value={stars} onChange={setStars} />
      <textarea
        className={styles.textarea}
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder={productTitle ? `How was the ${productTitle}?` : 'Write your review…'}
        rows={3}
        minLength={3}
        required
      />
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
      <div className={styles.actions}>
        <button type="button" className={styles.cancelButton} onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </button>
        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
