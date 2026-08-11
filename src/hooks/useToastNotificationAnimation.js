import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'

export const TOAST_EXIT_DURATION_MS = 250

const TOAST_ANIMATION_DURATION = TOAST_EXIT_DURATION_MS / 1000

/**
 * Coordinates the toast's mount and dismissal motion while preserving queue timing.
 */
function useToastNotificationAnimation(notificationRef, isExiting) {
  useLayoutEffect(() => {
    const notification = notificationRef.current
    if (!notification) return undefined

    const context = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        if (isExiting) gsap.set(notification, { autoAlpha: 0 })
        return
      }

      if (isExiting) {
        gsap.to(notification, {
          autoAlpha: 0,
          y: 20,
          scale: 0.98,
          duration: TOAST_ANIMATION_DURATION,
          ease: 'power2.in',
        })
        return
      }

      gsap.fromTo(
        notification,
        {
          autoAlpha: 0,
          y: 16,
          scale: 0.98,
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: TOAST_ANIMATION_DURATION,
          ease: 'power2.out',
          clearProps: 'transform,opacity,visibility',
        },
      )
    }, notification)

    return () => context.revert()
  }, [isExiting, notificationRef])
}

export default useToastNotificationAnimation
