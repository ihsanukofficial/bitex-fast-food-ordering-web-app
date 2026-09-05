import { computeAccountStats } from '../../../utils/orderStatus';
import ProfileStats from '../ProfileStats/ProfileStats';
import RecentOrders from '../RecentOrders/RecentOrders';
import styles from './ProfileOverview.module.css';

/**
 * ProfileOverview
 *
 * The account center's landing view: at-a-glance totals plus recent activity, both
 * derived from the same order list the rest of the profile page already loaded.
 */
function ProfileOverview({ orders, onViewOrder, onViewAllOrders, onBrowseMenu }) {
  const stats = computeAccountStats(orders);

  return (
    <div className={styles.overview}>
      <ProfileStats stats={stats} />
      <RecentOrders
        orders={orders}
        onViewDetails={onViewOrder}
        onViewAll={onViewAllOrders}
        onBrowseMenu={onBrowseMenu}
      />
    </div>
  );
}

export default ProfileOverview;
