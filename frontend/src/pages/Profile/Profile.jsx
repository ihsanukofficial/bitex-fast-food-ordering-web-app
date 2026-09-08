import { useCallback, useEffect, useRef, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Container from '../../components/Utils/Container/Container';
import AccountNavigation from '../../components/Profile/AccountNavigation/AccountNavigation';
import AccountSettings from '../../components/Profile/AccountSettings/AccountSettings';
import ErrorState from '../../components/Profile/ErrorState/ErrorState';
import LoadingSkeleton from '../../components/Profile/LoadingSkeleton/LoadingSkeleton';
import OrderDetails from '../../components/Profile/OrderDetails/OrderDetails';
import OrderHistory from '../../components/Profile/OrderHistory/OrderHistory';
import PersonalInformation from '../../components/Profile/PersonalInformation/PersonalInformation';
import ProfileHeader from '../../components/Profile/ProfileHeader/ProfileHeader';
import ProfileOverview from '../../components/Profile/ProfileOverview/ProfileOverview';
import ReviewList from '../../components/Profile/ReviewList/ReviewList';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import usePageEntranceAnimations from '../../hooks/usePageEntranceAnimations';
import { apiClient } from '../../services/apiClient';
import { showToast } from '../../utils/toast';
import styles from './Profile.module.css';

const VALID_TABS = ['overview', 'personal', 'orders', 'reviews', 'settings'];

/**
 * Profile
 *
 * The customer's account center: identity + editable details, order history and
 * details, submitted/pending reviews, and account settings — all driven by the
 * signed-in user's own data from the existing backend, with no fabricated fields.
 */
function Profile() {
  // The header and nav are persistent chrome — they should only ever play their
  // entrance once, on mount. Only contentRef is re-keyed by activeTab, so switching
  // tabs replays the animation for the new content without also re-triggering it on
  // the (unchanged) avatar/header and nav above, which used to visibly flicker on
  // every tab click because a single page-wide ref was re-scoped on every switch.
  const headerRef = useRef(null);
  const navRef = useRef(null);
  const contentRef = useRef(null);
  const { user, logout, refresh } = useAuth();
  const { socket } = useNotifications();
  const navigate = useNavigate();
  const location = useLocation();

  // Each tab (and an order's own detail view) is a real route rather than local
  // state, so the back button, a refresh, and a shared/bookmarked link all land on
  // the same screen the customer was looking at instead of always reopening Overview.
  const segments = location.pathname.replace(/^\/profile\/?/, '').split('/').filter(Boolean);
  const activeTab = VALID_TABS.includes(segments[0]) ? segments[0] : 'overview';
  const viewingOrderId = activeTab === 'orders' && segments[1] ? segments[1] : null;

  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const [orders, setOrders] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [ordersError, setOrdersError] = useState('');

  usePageEntranceAnimations(headerRef);
  usePageEntranceAnimations(navRef);
  usePageEntranceAnimations(contentRef, activeTab);

  const loadOrders = useCallback(() => {
    setIsLoadingOrders(true);
    setOrdersError('');
    return apiClient
      .get('/users/me/orders')
      .then((data) => setOrders(data.orders))
      .catch((error) => setOrdersError(error.message))
      .finally(() => setIsLoadingOrders(false));
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  // A live order-status push (see NotificationContext) means this customer's own order
  // list just changed server-side — refetch quietly so the page stays current without
  // the customer having to reload it themselves.
  useEffect(() => {
    if (!socket) return undefined;

    const handleNewNotification = () => loadOrders();
    socket.on('notification:new', handleNewNotification);
    return () => socket.off('notification:new', handleNewNotification);
  }, [socket, loadOrders]);

  // Clears the "scroll to the review button" flag the notification bell's "Leave a
  // Review" button set on this navigation — called by OrderDetails itself once it has
  // actually acted on the flag (orders load asynchronously, so clearing this eagerly
  // on mount would race ahead of OrderDetails ever mounting to see it), so it doesn't
  // fire again on a later visit to the same history entry (browser back/forward
  // restores router state too).
  const clearReviewScrollFlag = useCallback(() => {
    navigate(location.pathname, { replace: true, state: {} });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const selectTab = (tab) => {
    navigate(tab === 'overview' ? '/profile' : `/profile/${tab}`);
    setIsEditingProfile(false);
  };

  const viewOrder = (orderId) => navigate(`/profile/orders/${orderId}`);

  const handleEditProfileFromHeader = () => {
    navigate('/profile/personal');
    setIsEditingProfile(true);
  };

  if (segments[0] && !VALID_TABS.includes(segments[0])) {
    return <Navigate to="/profile" replace />;
  }

  const handleProfileSaved = async () => {
    setIsEditingProfile(false);
    await refresh().catch(() => {});
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleAccountDeleted = async () => {
    await logout();
    navigate('/');
    showToast('Your account has been deleted.');
  };

  const handleBrowseMenu = () => navigate('/menu');

  const handleReviewSubmitted = (orderId, itemIndex, review) => {
    setOrders((current) =>
      current.map((order) =>
        order._id === orderId
          ? {
              ...order,
              items: order.items.map((item, index) => (index === itemIndex ? { ...item, review } : item)),
            }
          : order,
      ),
    );
  };

  const handleReviewDeleted = (orderId, itemIndex) => {
    setOrders((current) =>
      current.map((order) =>
        order._id === orderId
          ? {
              ...order,
              items: order.items.map((item, index) => (index === itemIndex ? { ...item, review: null } : item)),
            }
          : order,
      ),
    );
  };

  const renderOrderDependentContent = (render) => {
    if (isLoadingOrders) {
      return (
        <div className={styles.loadingStack}>
          {activeTab === 'overview' && <LoadingSkeleton variant="stat" count={4} />}
          <LoadingSkeleton variant={activeTab === 'reviews' ? 'card' : 'row'} count={3} />
        </div>
      );
    }
    if (ordersError) {
      return <ErrorState message={ordersError} onRetry={loadOrders} />;
    }
    return render();
  };

  const viewingOrder = viewingOrderId ? orders.find((order) => order._id === viewingOrderId) : null;

  let content;
  if (viewingOrderId) {
    content = renderOrderDependentContent(() =>
      viewingOrder ? (
        <OrderDetails
          order={viewingOrder}
          onBack={() => navigate('/profile/orders')}
          onReviewSubmitted={(itemIndex, review) => handleReviewSubmitted(viewingOrder._id, itemIndex, review)}
          onReviewDeleted={(itemIndex) => handleReviewDeleted(viewingOrder._id, itemIndex)}
          scrollToReview={Boolean(location.state?.scrollToReview)}
          onReviewScrollHandled={clearReviewScrollFlag}
        />
      ) : (
        <ErrorState message="That order could not be found." onRetry={() => navigate('/profile/orders')} />
      ),
    );
  } else if (activeTab === 'personal') {
    content = (
      <PersonalInformation
        user={user}
        isEditing={isEditingProfile}
        onStartEdit={() => setIsEditingProfile(true)}
        onCancelEdit={() => setIsEditingProfile(false)}
        onSaved={handleProfileSaved}
      />
    );
  } else if (activeTab === 'settings') {
    content = (
      <AccountSettings user={user} onLogout={handleLogout} onAccountDeleted={handleAccountDeleted} />
    );
  } else if (activeTab === 'orders') {
    content = renderOrderDependentContent(() => (
      <OrderHistory orders={orders} onViewDetails={viewOrder} onBrowseMenu={handleBrowseMenu} />
    ));
  } else if (activeTab === 'reviews') {
    content = renderOrderDependentContent(() => (
      <ReviewList
        orders={orders}
        onReviewUpdated={handleReviewSubmitted}
        onReviewDeleted={handleReviewDeleted}
        onBrowseMenu={handleBrowseMenu}
      />
    ));
  } else {
    content = renderOrderDependentContent(() => (
      <ProfileOverview
        orders={orders}
        onViewOrder={viewOrder}
        onViewAllOrders={() => selectTab('orders')}
        onBrowseMenu={handleBrowseMenu}
      />
    ));
  }

  return (
    <main id="main-content" className={styles.page} tabIndex="-1">
      <Container>
        <div ref={headerRef}>
          <ProfileHeader user={user} onEditProfile={handleEditProfileFromHeader} />
        </div>

        <div className={styles.layout}>
          <div ref={navRef}>
            <AccountNavigation activeTab={activeTab} onSelectTab={selectTab} onLogout={handleLogout} />
          </div>
          <div ref={contentRef} className={styles.content}>
            {content}
          </div>
        </div>
      </Container>
    </main>
  );
}

export default Profile;
