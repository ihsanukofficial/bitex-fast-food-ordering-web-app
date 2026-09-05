import { useState } from 'react';
import { apiClient } from '../../../services/apiClient';
import CartPromoCodeApplyButton from '../CartPromoCodeApplyButton/CartPromoCodeApplyButton';
import CartPromoCodeControls from '../CartPromoCodeControls/CartPromoCodeControls';
import CartPromoCodeInput from '../CartPromoCodeInput/CartPromoCodeInput';
import CartPromoCodeLabel from '../CartPromoCodeLabel/CartPromoCodeLabel';
import CartPromoCodeMessage from '../CartPromoCodeMessage/CartPromoCodeMessage';
import styles from './CartPromoCodeForm.module.css';

/**
 * CartPromoCodeForm
 *
 * Owns promo-code input feedback. Validity and the discount percentage are decided
 * server-side so codes are never exposed in the client bundle.
 */
function CartPromoCodeForm({ onApply }) {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const normalizedCode = code.trim().toUpperCase();
    if (!normalizedCode) return;

    setIsSubmitting(true);
    try {
      const result = await apiClient.post('/promo-codes/validate', { code: normalizedCode });
      onApply(
        result.valid
          ? {
              code: normalizedCode,
              discountPercentage: result.discountPercentage,
              appliesTo: result.appliesTo,
              productIds: result.productIds,
              dealIds: result.dealIds,
            }
          : null,
      );
      setMessage(
        result.valid
          ? `${normalizedCode} applied: ${result.discountPercentage}% off${
              result.appliesTo === 'specific' ? ' eligible items' : ''
            }`
          : 'Invalid promo code',
      );
    } catch {
      onApply(null);
      setMessage('Could not check that code. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <CartPromoCodeLabel inputId="promo-code" />
      <CartPromoCodeControls>
        <CartPromoCodeInput
          id="promo-code"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="Enter code"
        />
        <CartPromoCodeApplyButton disabled={isSubmitting} />
      </CartPromoCodeControls>
      <CartPromoCodeMessage message={message} />
    </form>
  );
}

export default CartPromoCodeForm;
