import webpush from 'web-push';
import PushSubscription from '../models/PushSubscription.js';
import User from '../models/User.js';

const { VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT } = process.env;
const isConfigured = Boolean(VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY);

if (isConfigured) {
  webpush.setVapidDetails(VAPID_SUBJECT || 'mailto:admin@bitex.com', VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
}

export const getPublicKey = () => (isConfigured ? VAPID_PUBLIC_KEY : null);

/**
 * Sends a Web Push message to every subscribed browser of every active admin, so a
 * new order surfaces as an OS notification even when the site isn't open. Best-effort:
 * failures never block the request that triggered it, and subscriptions the push
 * service reports as gone (404/410) are pruned.
 */
export const notifyAdminsPush = async (payload) => {
  if (!isConfigured) return;

  try {
    const adminIds = await User.find({ role: 'admin', active: true }).distinct('_id');
    const subscriptions = await PushSubscription.find({ user: { $in: adminIds } });
    const body = JSON.stringify(payload);

    await Promise.all(
      subscriptions.map(async (subscription) => {
        try {
          await webpush.sendNotification(
            { endpoint: subscription.endpoint, keys: subscription.keys },
            body,
          );
        } catch (error) {
          if (error.statusCode === 404 || error.statusCode === 410) {
            await subscription.deleteOne();
          } else {
            console.warn('Web push failed:', error.statusCode || error.message);
          }
        }
      }),
    );
  } catch (error) {
    console.warn('Web push skipped:', error.message);
  }
};
