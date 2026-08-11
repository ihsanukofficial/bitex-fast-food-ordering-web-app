import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'

/**
 * Plays the persistent Navbar's entrance once when the application first mounts.
 * Client-side route changes do not remount the Navbar, so the effect does not replay.
 */
function useNavbarEntranceAnimation(navbarRef) {
  useLayoutEffect(() => {
    const navbar = navbarRef.current

    if (
      !navbar ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return undefined
    }

    const context = gsap.context(() => {
      gsap.from(navbar, {
        autoAlpha: 0,
        y: -14,
        duration: 0.68,
        ease: 'power3.out',
        clearProps: 'transform,opacity,visibility',
      })
    }, navbar)

    return () => context.revert()
  }, [navbarRef])
}

export default useNavbarEntranceAnimation
