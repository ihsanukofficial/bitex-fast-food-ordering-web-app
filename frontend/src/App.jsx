import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import SiteNavbar from './components/Navbar/SiteNavbar/SiteNavbar'
import RouteScrollManager from './components/Utils/RouteScrollManager/RouteScrollManager'
import PageLoadingState from './components/Utils/PageLoadingState/PageLoadingState'
import ToastNotificationContainer from './components/Utils/ToastNotification/ToastNotificationContainer/ToastNotificationContainer'
import SiteFooter from './components/Footer/SiteFooter/SiteFooter'
import RequireAuth from './components/Auth/RequireAuth/RequireAuth'
import RequireAdmin from './components/Auth/RequireAdmin/RequireAdmin'
import { AuthProvider } from './context/AuthContext'
import { BrandingProvider } from './context/BrandingContext'
import { CartProvider } from './context/CartContext'
import { NotificationProvider } from './context/NotificationContext'
import { WishlistProvider } from './context/WishlistContext'
import {
  loadAboutRoute,
  loadAdminRoute,
  loadDealDetailRoute,
  loadDealsRoute,
  loadHomeRoute,
  loadLoginRoute,
  loadMenuRoute,
  loadNotFoundRoute,
  loadProductDetailRoute,
  loadProfileRoute,
  loadRegisterRoute,
  loadWishlistRoute,
} from './utils/routeLoaders'

// Route-level splitting keeps page-specific code out of the initial application bundle.
const Home = lazy(loadHomeRoute)
const Menu = lazy(loadMenuRoute)
const About = lazy(loadAboutRoute)
const Deals = lazy(loadDealsRoute)
const ProductDetail = lazy(loadProductDetailRoute)
const DealDetail = lazy(loadDealDetailRoute)
const Login = lazy(loadLoginRoute)
const Register = lazy(loadRegisterRoute)
const Profile = lazy(loadProfileRoute)
const Wishlist = lazy(loadWishlistRoute)
const Admin = lazy(loadAdminRoute)
const NotFound = lazy(loadNotFoundRoute)

/**
 * App
 *
 * Defines the application shell, lazy route boundaries, shared navigation, and global
 * notification surface.
 */
function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <BrandingProvider>
      <AuthProvider>
        <CartProvider>
          <NotificationProvider>
            <WishlistProvider>
              <RouteScrollManager />
              {!isAdminRoute && <SiteNavbar />}

              <Suspense fallback={<PageLoadingState />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/menu/:category?" element={<Menu />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/deals" element={<Deals />} />
                  <Route path="/productdetail/:slug" element={<ProductDetail />} />
                  <Route path="/dealdetail/:id" element={<DealDetail />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/profile/*"
                    element={
                      <RequireAuth>
                        <Profile />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="/wishlist"
                    element={
                      <RequireAuth>
                        <Wishlist />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="/admin/*"
                    element={
                      <RequireAdmin>
                        <Admin />
                      </RequireAdmin>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              {!isAdminRoute && <SiteFooter />}
              <ToastNotificationContainer />
            </WishlistProvider>
          </NotificationProvider>
        </CartProvider>
      </AuthProvider>
    </BrandingProvider>
  )
}

export default App
