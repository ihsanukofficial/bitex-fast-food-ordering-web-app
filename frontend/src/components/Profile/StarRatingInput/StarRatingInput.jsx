import { useState } from 'react';
import Icon from '../../Utils/Icon/Icon';
import productReviewStars from '../../../data/productReviewStars';
import styles from './StarRatingInput.module.css';

/**
 * StarRatingInput
 *
 * An interactive five-star picker sharing the same fill/outline convention as
 * ProductDetailReviewStars, so a rating looks the same whether it's being read or
 * being given.
 */
function StarRatingInput({ value, onChange }) {
  const [hoverValue, setHoverValue] = useState(0);
  const displayValue = hoverValue || value;

  return (
    <div className={styles.stars} role="radiogroup" aria-label="Rating out of 5 stars">
      {productReviewStars.map((star) => (
        <button
          key={star}
          type="button"
          role="radio"
          aria-checked={value === star}
          aria-label={`${star} star${star > 1 ? 's' : ''}`}
          className={styles.starButton}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHoverValue(star)}
          onMouseLeave={() => setHoverValue(0)}
          onFocus={() => setHoverValue(star)}
          onBlur={() => setHoverValue(0)}
        >
          <Icon
            name={star <= displayValue ? 'ri-star-fill' : 'ri-star-line'}
            color={star <= displayValue ? '#fca810' : '#a3a3a3'}
            size="1.4rem"
            ariaLabel=""
          />
        </button>
      ))}
    </div>
  );
}

export default StarRatingInput;
