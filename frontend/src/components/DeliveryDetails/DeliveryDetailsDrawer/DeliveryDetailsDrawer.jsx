import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useCart } from '../../../context/CartContext';
import useFocusTrap from '../../../hooks/useFocusTrap';
import { apiClient } from '../../../services/apiClient';
import DeliveryDetailsDismissLayer from '../DeliveryDetailsDismissLayer/DeliveryDetailsDismissLayer';
import DeliveryDetailsDrawerShell from '../DeliveryDetailsDrawerShell/DeliveryDetailsDrawerShell';
import DeliveryDetailsForm from '../DeliveryDetailsForm/DeliveryDetailsForm';
import DeliveryDetailsHeader from '../DeliveryDetailsHeader/DeliveryDetailsHeader';
import OrderConfirmation from '../OrderConfirmation/OrderConfirmation';

/**
 * DeliveryDetailsDrawer
 *
 * Coordinates the checkout form and order-confirmation states inside a focus-trapped
 * delivery dialog. Order placement requires an authenticated session — SiteNavbar
 * redirects signed-out visitors to /login before this drawer is ever opened.
 */
function DeliveryDetailsDrawer({ isOpen, onClose, onContinueToMenu, promoCode }) {
  const { user } = useAuth();
  const { refresh } = useCart();
  const drawerRef = useRef(null);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const closeDrawer = useCallback(() => {
    setIsOrderConfirmed(false);
    setSubmitError('');
    onClose();
  }, [onClose]);

  const continueToMenu = useCallback(() => {
    setIsOrderConfirmed(false);
    onContinueToMenu();
  }, [onContinueToMenu]);

  useFocusTrap({
    containerRef: drawerRef,
    isActive: isOpen,
    onEscape: closeDrawer,
    initialFocusSelector: 'input',
  });

  useEffect(() => {
    if (!isOpen) return undefined;

    // Restore the prior inline value because the cart overlay may also lock scrolling.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('customer-name') || '').trim();
    const phone = String(formData.get('customer-phone') || '').trim();
    const email = String(formData.get('customer-email') || '').trim();
    const address = String(formData.get('deliveryAddress') || '').trim();
    const instructions = String(formData.get('deliveryRequirements') || '').trim();
    const nameInput = form.elements.namedItem('customer-name');
    const phoneInput = form.elements.namedItem('customer-phone');
    const addressInput = form.elements.namedItem('deliveryAddress');
    const phoneDigitCount = phone.replace(/\D/g, '').length;

    nameInput.setCustomValidity(
      name.length >= 2 ? '' : 'Enter at least two non-space characters.',
    );
    phoneInput.setCustomValidity(
      phoneDigitCount >= 7 && phoneDigitCount <= 15
        ? ''
        : 'Enter a phone number containing 7 to 15 digits.',
    );
    addressInput.setCustomValidity(
      address.length >= 10
        ? ''
        : 'Enter a complete delivery address of at least 10 characters.',
    );

    if (!form.reportValidity()) return;

    setIsSubmitting(true);
    try {
      // The backend prices and clears the order directly from the persisted cart —
      // no item data is sent from here at all.
      await apiClient.post('/orders', {
        delivery: { name, phone, email, address, instructions },
        promoCode: promoCode || undefined,
      });
      await refresh().catch(() => {});
      setIsOrderConfirmed(true);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <DeliveryDetailsDismissLayer isOpen={isOpen} onClick={closeDrawer} />
      <DeliveryDetailsDrawerShell drawerRef={drawerRef} isOpen={isOpen}>
        <DeliveryDetailsHeader onClose={closeDrawer} />
        {isOrderConfirmed ? (
          <OrderConfirmation onContinueToMenu={continueToMenu} />
        ) : (
          <DeliveryDetailsForm
            // Remounts once the profile finishes loading so the uncontrolled fields'
            // defaultValue reflects the real data instead of the pre-load empty state.
            key={user?.id || 'loading'}
            user={user}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            error={submitError}
          />
        )}
      </DeliveryDetailsDrawerShell>
    </>
  );
}

export default DeliveryDetailsDrawer;
