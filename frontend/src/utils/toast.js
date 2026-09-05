import { ACCOUNT_TOAST_EVENT } from './notificationConstants';

/**
 * Pops a message in the shared toast feed. `status: 'error'` renders the red/alert
 * treatment; anything else (default) renders the standard success/checkmark treatment.
 */
export const showToast = (message, status = 'order-update') => {
  window.dispatchEvent(new CustomEvent(ACCOUNT_TOAST_EVENT, { detail: { status, message } }));
};
