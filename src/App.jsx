import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import SiteNavbar from './components/Navbar/SiteNavbar/SiteNavbar'
import RouteScrollManager from './components/Utils/RouteScrollManager/RouteScrollManager'
import PageLoadingState from './components/Utils/PageLoadingState/PageLoadingState'
import ToastNotificationContainer from './components/Utils/ToastNotification/ToastNotificationContainer/ToastNotificationContainer'
import SiteFooter from './components/Footer/SiteFooter/SiteFooter'
import {
  loadAboutRoute,
  loadDealsRoute,
  loadHomeRoute,
  loadMenuRoute,
  loadNotFoundRoute,
  loadProductDetailRoute,
} from './utils/routeLoaders'

// Route-level splitting keeps page-specific code out of the initial application bundle.
const Home = lazy(loadHomeRoute)
const Menu = lazy(loadMenuRoute)
const About = lazy(loadAboutRoute)
const Deals = lazy(loadDealsRoute)
const ProductDetail = lazy(loadProductDetailRoute)
const NotFound = lazy(loadNotFoundRoute)

/**
 * App
 *
 * Defines the application shell, lazy route boundaries, shared navigation, and global
 * notification surface.
 */
function App() {
  return (
    <>
      <RouteScrollManager />
      <SiteNavbar />

      <Suspense fallback={<PageLoadingState />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu/:category?" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/productdetail/:slug" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <SiteFooter />
      <ToastNotificationContainer />
    </>
  )
}

export default App
