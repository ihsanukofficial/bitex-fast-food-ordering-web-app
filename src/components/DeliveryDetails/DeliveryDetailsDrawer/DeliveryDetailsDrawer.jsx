import { useCallback, useEffect, useRef, useState } from 'react';
import useFocusTrap from '../../../hooks/useFocusTrap';
import { clearCart } from '../../../utils/cartStorage';
import DeliveryDetailsDismissLayer from '../DeliveryDetailsDismissLayer/DeliveryDetailsDismissLayer';
import DeliveryDetailsDrawerShell from '../DeliveryDetailsDrawerShell/DeliveryDetailsDrawerShell';
import DeliveryDetailsForm from '../DeliveryDetailsForm/DeliveryDetailsForm';
import DeliveryDetailsHeader from '../DeliveryDetailsHeader/DeliveryDetailsHeader';
import OrderConfirmation from '../OrderConfirmation/OrderConfirmation';

/**
 * DeliveryDetailsDrawer
 *
 * Coordinates the checkout form and order-confirmation states inside a focus-trapped
 * delivery dialog.
 */
function DeliveryDetailsDrawer({ isOpen, onClose, onContinueToMenu }) {
  const drawerRef = useRef(null);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  const closeDrawer = useCallback(() => {
    setIsOrderConfirmed(false);
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

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('customer-name') || '').trim();
    const phone = String(formData.get('customer-phone') || '').trim();
    const address = String(formData.get('deliveryAddress') || '').trim();
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

    // The confirmation state represents a completed order, so its source cart is cleared.
    clearCart();
    setIsOrderConfirmed(true);
  };

  return (
    <>
      <DeliveryDetailsDismissLayer isOpen={isOpen} onClick={closeDrawer} />
      <DeliveryDetailsDrawerShell drawerRef={drawerRef} isOpen={isOpen}>
        <DeliveryDetailsHeader onClose={closeDrawer} />
        {isOrderConfirmed ? (
          <OrderConfirmation onContinueToMenu={continueToMenu} />
        ) : (
          <DeliveryDetailsForm onSubmit={handleSubmit} />
        )}
      </DeliveryDetailsDrawerShell>
    </>
  );
}

export default DeliveryDetailsDrawer;
