import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLayout from '../../components/Admin/AdminLayout/AdminLayout';
import AdminActivityLog from './AdminActivityLog/AdminActivityLog';
import AdminCategories from './AdminCategories/AdminCategories';
import AdminContent from './AdminContent/AdminContent';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import AdminDeals from './AdminDeals/AdminDeals';
import AdminOrderDetail from './AdminOrderDetail/AdminOrderDetail';
import AdminOrders from './AdminOrders/AdminOrders';
import AdminProducts from './AdminProducts/AdminProducts';
import AdminPromoCodes from './AdminPromoCodes/AdminPromoCodes';
import AdminReviews from './AdminReviews/AdminReviews';
import AdminUserDetail from './AdminUserDetail/AdminUserDetail';
import AdminUsers from './AdminUsers/AdminUsers';
import LiveEditor from './AdminContent/LiveEditor/LiveEditor';

/**
 * Admin
 *
 * Root of the admin panel's own nested route tree, reached at /admin/*. RequireAdmin
 * (applied by App.jsx) already guarantees an admin session before this ever renders.
 */
function Admin() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/dashboard/:tab?" element={<AdminDashboard />} />
        <Route path="/products" element={<AdminProducts />} />
        <Route path="/categories" element={<AdminCategories />} />
        <Route path="/deals" element={<AdminDeals />} />
        <Route path="/promo-codes" element={<AdminPromoCodes />} />
        <Route path="/orders" element={<AdminOrders />} />
        <Route path="/orders/:id" element={<AdminOrderDetail />} />
        <Route path="/reviews" element={<AdminReviews />} />
        <Route path="/users" element={<AdminUsers />} />
        <Route path="/users/:id" element={<AdminUserDetail />} />
        <Route path="/content" element={<AdminContent />} />
        <Route path="/editor" element={<LiveEditor />} />
        <Route path="/activity-log" element={<AdminActivityLog />} />
      </Routes>
    </AdminLayout>
  );
}

export default Admin;
