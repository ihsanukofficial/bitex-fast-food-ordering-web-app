import { useState } from 'react';
import promoCodes from '../../../data/promoCodes';
import CartPromoCodeApplyButton from '../CartPromoCodeApplyButton/CartPromoCodeApplyButton';
import CartPromoCodeControls from '../CartPromoCodeControls/CartPromoCodeControls';
import CartPromoCodeInput from '../CartPromoCodeInput/CartPromoCodeInput';
import CartPromoCodeLabel from '../CartPromoCodeLabel/CartPromoCodeLabel';
import CartPromoCodeMessage from '../CartPromoCodeMessage/CartPromoCodeMessage';
import styles from './CartPromoCodeForm.module.css';

/**
 * CartPromoCodeForm
 *
 * Owns promo-code input feedback and normalizes submitted codes before exposing the
 * applicable discount.
 */
function CartPromoCodeForm({ onApply }) {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const normalizedCode = code.trim().toUpperCase();
    const discountPercentage = promoCodes[normalizedCode];
    const isValid = discountPercentage !== undefined;

    onApply(isValid ? discountPercentage : 0);
    setMessage(
      isValid
        ? `${normalizedCode} applied: ${discountPercentage}% off`
        : 'Invalid promo code',
    );
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
        <CartPromoCodeApplyButton />
      </CartPromoCodeControls>
      <CartPromoCodeMessage message={message} />
    </form>
  );
}

export default CartPromoCodeForm;
