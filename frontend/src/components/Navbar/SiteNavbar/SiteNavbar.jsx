import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import useFocusTrap from '../../../hooks/useFocusTrap'
import useNavbarEntranceAnimation from '../../../hooks/useNavbarEntranceAnimation'
import { CLOSE_OVERLAYS_EVENT } from '../../../utils/notificationConstants'
import { preloadPrimaryRoutes } from '../../../utils/routeLoaders'
import Container from '../../Utils/Container/Container'
import Logo from '../../Utils/Logo/Logo'
import MenuGroup from '../../Utils/Navigation/MenuGroup/MenuGroup'
import NavbarActions from '../NavbarActions/NavbarActions'
import NavbarAuthButtons from '../NavbarAuthButtons/NavbarAuthButtons'
import NavbarBar from '../NavbarBar/NavbarBar'
import NavbarCartButton from '../NavbarCartButton/NavbarCartButton'
import NavbarContent from '../NavbarContent/NavbarContent'
import NavbarMenuToggle from '../NavbarMenuToggle/NavbarMenuToggle'
import NavbarMobileBackdrop from '../NavbarMobileBackdrop/NavbarMobileBackdrop'
import NavbarMobileDrawer from '../NavbarMobileDrawer/NavbarMobileDrawer'
import NavbarMobileDrawerCloseButton from '../NavbarMobileDrawerCloseButton/NavbarMobileDrawerCloseButton'
import NavbarMobileDrawerFooter from '../NavbarMobileDrawerFooter/NavbarMobileDrawerFooter'
import NavbarMobileDrawerHeader from '../NavbarMobileDrawerHeader/NavbarMobileDrawerHeader'
import NavbarMobileDrawerLogo from '../NavbarMobileDrawerLogo/NavbarMobileDrawerLogo'
import NavbarMobileDrawerNavigation from '../NavbarMobileDrawerNavigation/NavbarMobileDrawerNavigation'
import NavbarMobileDrawerNavigationLabel from '../NavbarMobileDrawerNavigationLabel/NavbarMobileDrawerNavigationLabel'
import NavbarMobileDrawerNote from '../NavbarMobileDrawerNote/NavbarMobileDrawerNote'
import NavbarMobileDrawerTagline from '../NavbarMobileDrawerTagline/NavbarMobileDrawerTagline'
import NavbarNotificationButton from '../NavbarNotificationButton/NavbarNotificationButton'
import NavbarProfileAvatar from '../NavbarProfileAvatar/NavbarProfileAvatar'
import styles from './SiteNavbar.module.css'

// Start loading the cart with the persistent Navbar so it can mount closed and be
// ready before the first interaction, while keeping it out of the blocking bundle.
const loadCartDrawer = () => import('../../Cart/CartDrawer/CartDrawer')
const CartDrawer = lazy(loadCartDrawer)
const loadDeliveryDetailsDrawer = () =>
  import('../../DeliveryDetails/DeliveryDetailsDrawer/DeliveryDetailsDrawer')
const DeliveryDetailsDrawer = lazy(
  loadDeliveryDetailsDrawer,
)

/**
 * SiteNavbar
 *
 * Owns responsive navigation, cart, delivery, and mobile-drawer state while
 * coordinating focus and body scroll behavior.
 */
function SiteNavbar() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const navbarRef = useRef(null)
  const navigationDrawerRef = useRef(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isDeliveryDetailsOpen, setIsDeliveryDetailsOpen] = useState(false)
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [hasLoadedDeliveryDetails, setHasLoadedDeliveryDetails] =
    useState(false)
  const [checkoutPromoCode, setCheckoutPromoCode] = useState('')

  useNavbarEntranceAnimation(navbarRef)

  useEffect(() => {
    const preloadNavigation = () => {
      preloadPrimaryRoutes(window.location.pathname)
    }
    let timeoutId = null
    let idleCallbackId = null

    if ('requestIdleCallback' in window) {
      idleCallbackId = window.requestIdleCallback(preloadNavigation, {
        timeout: 1800,
      })
    } else {
      timeoutId = window.setTimeout(preloadNavigation, 600)
    }

    return () => {
      if (idleCallbackId !== null) {
        window.cancelIdleCallback(idleCallbackId)
      }
      if (timeoutId !== null) window.clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    if (isNavOpen) preloadPrimaryRoutes(window.location.pathname)
  }, [isNavOpen])

  const closeCart = useCallback(() => {
    setIsDeliveryDetailsOpen(false)
    setIsCartOpen(false)
  }, [])
  const closeDeliveryDetails = useCallback(
    () => setIsDeliveryDetailsOpen(false),
    [],
  )
  const openDeliveryDetails = useCallback(
    (promoCode) => {
      if (!isAuthenticated) {
        setIsCartOpen(false)
        navigate(`/login?redirect=${encodeURIComponent(window.location.pathname)}`)
        return
      }

      setCheckoutPromoCode(promoCode || '')
      setHasLoadedDeliveryDetails(true)
      setIsDeliveryDetailsOpen(true)
    },
    [isAuthenticated, navigate],
  )
  const handleContinueToMenu = useCallback(() => {
    setIsDeliveryDetailsOpen(false)
    setIsCartOpen(false)
    navigate('/menu')
  }, [navigate])
  const closeNavigation = useCallback(() => setIsNavOpen(false), [])

  // A notification's "Leave a Review" button (or anything else that navigates the
  // user somewhere it wants a clear view of) asks every navbar-owned overlay to
  // close first, via a plain window event rather than prop-drilling — see
  // CLOSE_OVERLAYS_EVENT.
  useEffect(() => {
    const closeAllOverlays = () => {
      setIsDeliveryDetailsOpen(false)
      setIsCartOpen(false)
      setIsNavOpen(false)
    }
    window.addEventListener(CLOSE_OVERLAYS_EVENT, closeAllOverlays)
    return () => window.removeEventListener(CLOSE_OVERLAYS_EVENT, closeAllOverlays)
  }, [])

  const toggleNavigation = useCallback(() => {
    setIsDeliveryDetailsOpen(false)
    setIsCartOpen(false)
    setIsNavOpen((current) => !current)
  }, [])

  const toggleCart = useCallback(() => {
    setIsDeliveryDetailsOpen(false)
    setIsNavOpen(false)

    if (!isCartOpen) {
      loadDeliveryDetailsDrawer().catch(() => undefined)
    }
    setIsCartOpen((current) => !current)
  }, [isCartOpen])

  useFocusTrap({
    containerRef: navigationDrawerRef,
    isActive: isNavOpen,
    onEscape: closeNavigation,
  })

  useEffect(() => {
    if (!isNavOpen) return undefined

    // Restore the prior inline value because other overlays may also control scrolling.
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isNavOpen])

  useEffect(() => {
    // A breakpoint change can otherwise leave an invisible mobile dialog focus-trapped.
    const desktopMedia = window.matchMedia('(min-width: 1024px)')
    const closeOnDesktop = (event) => {
      if (event.matches) closeNavigation()
    }

    closeOnDesktop(desktopMedia)
    desktopMedia.addEventListener('change', closeOnDesktop)

    return () => {
      desktopMedia.removeEventListener('change', closeOnDesktop)
    }
  }, [closeNavigation])

  return (
    <>
      <a className={styles.skipLink} href="#main-content">
        Skip to main content
      </a>
      <NavbarBar barRef={navbarRef}>
        <Container>
          <NavbarContent>
            <NavbarMenuToggle isOpen={isNavOpen} onClick={toggleNavigation} />
            <Logo />
            <MenuGroup />
            <NavbarActions>
              {isAuthenticated ? (
                <>
                  <NavbarCartButton isOpen={isCartOpen} onClick={toggleCart} />
                  <NavbarNotificationButton />
                  <NavbarProfileAvatar />
                </>
              ) : (
                <NavbarAuthButtons />
              )}
            </NavbarActions>
          </NavbarContent>
        </Container>
      </NavbarBar>

      <NavbarMobileBackdrop isOpen={isNavOpen} onClick={closeNavigation} />
      <NavbarMobileDrawer
        drawerRef={navigationDrawerRef}
        isOpen={isNavOpen}
      >
        <NavbarMobileDrawerHeader>
          <NavbarMobileDrawerLogo onNavigate={closeNavigation} />
          <NavbarMobileDrawerCloseButton onClick={closeNavigation} />
        </NavbarMobileDrawerHeader>
        <NavbarMobileDrawerNavigation>
          <NavbarMobileDrawerNavigationLabel />
          <MenuGroup variant="sidebar" onNavigate={closeNavigation} />
        </NavbarMobileDrawerNavigation>
        <NavbarMobileDrawerFooter>
          <NavbarMobileDrawerTagline />
          <NavbarMobileDrawerNote />
        </NavbarMobileDrawerFooter>
      </NavbarMobileDrawer>

      <Suspense fallback={null}>
        <CartDrawer
          isOpen={isCartOpen}
          isCovered={isDeliveryDetailsOpen}
          onClose={closeCart}
          onCheckout={openDeliveryDetails}
          onBrowseMenu={handleContinueToMenu}
        />
      </Suspense>

      {hasLoadedDeliveryDetails && (
        <Suspense fallback={null}>
          <DeliveryDetailsDrawer
            isOpen={isDeliveryDetailsOpen}
            onClose={closeDeliveryDetails}
            onContinueToMenu={handleContinueToMenu}
            promoCode={checkoutPromoCode}
          />
        </Suspense>
      )}
    </>
  )
}

export default SiteNavbar
