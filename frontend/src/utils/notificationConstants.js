/**
 * Fired whenever a real-time notification (order status update, etc.) should also pop up
 * as a toast. Kept separate from CART_ITEM_ADD_RESULT_EVENT since the two originate from
 * different providers, but both are consumed by the same ToastNotificationContainer.
 */
export const ORDER_NOTIFICATION_TOAST_EVENT = 'bitex:order-notification';

/**
 * Fired for one-off account actions (profile saved, review updated, etc.) that need a
 * toast but aren't tied to a real-time server push. Same consumer, same event shape,
 * as ORDER_NOTIFICATION_TOAST_EVENT — see utils/toast.js for the dispatch helper.
 */
export const ACCOUNT_TOAST_EVENT = 'bitex:account-toast';

/**
 * Fired when an action needs every other overlay (cart drawer, delivery-details
 * drawer, mobile nav drawer, profile menu, ...) to close first — e.g. the
 * notification bell's "Leave a Review" button, which then navigates and scrolls the
 * page, so nothing should still be covering the content underneath.
 */
export const CLOSE_OVERLAYS_EVENT = 'bitex:close-overlays';
