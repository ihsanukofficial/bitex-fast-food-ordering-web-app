import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function createImageEntrance(image, compactViewport) {
  const fadeOnly = image.dataset.imageEntrance === 'fade-only'
  let hasEnteredViewport = false
  let hasLoaded = image.complete && image.naturalWidth > 0
  let hasFailed =
    image.complete && Boolean(image.currentSrc) && image.naturalWidth === 0
  let tween

  const revealWhenReady = () => {
    if (!hasEnteredViewport) return

    if (hasFailed) {
      tween.progress(1)
      return
    }

    if (hasLoaded) tween.play()
  }

  const handleLoad = () => {
    hasLoaded = true
    revealWhenReady()
  }
  const handleError = () => {
    hasFailed = true
    revealWhenReady()
  }

  if (!hasLoaded && !hasFailed) {
    image.addEventListener('load', handleLoad, { once: true })
    image.addEventListener('error', handleError, { once: true })
  }

  const context = gsap.context(() => {
    const fromProperties = { autoAlpha: 0 }
    const toProperties = {
      autoAlpha: 1,
      duration: 0.76,
      ease: 'power2.out',
      paused: true,
      clearProps: fadeOnly
        ? 'opacity,visibility'
        : 'transform,opacity,visibility',
    }

    if (!fadeOnly) {
      fromProperties.y = compactViewport ? 8 : 12
      fromProperties.scale = compactViewport ? 0.992 : 0.985
      toProperties.y = 0
      toProperties.scale = 1
    }

    tween = gsap.fromTo(image, fromProperties, toProperties)

    ScrollTrigger.create({
      trigger: image,
      start: compactViewport ? 'top 90%' : 'top 84%',
      once: true,
      onEnter: () => {
        hasEnteredViewport = true
        revealWhenReady()
      },
    })
  }, image)

  return () => {
    image.removeEventListener('load', handleLoad)
    image.removeEventListener('error', handleError)
    context.revert()
  }
}

/**
 * Reveals loaded images once, after they first enter the viewport. New images added by
 * filtered or routed content are registered without changing their loading behavior.
 */
function useImageEntranceAnimations(scopeRef, animationKey) {
  useLayoutEffect(() => {
    const scope = scopeRef.current
    if (!scope) return undefined

    const motionPreferences = gsap.matchMedia()
    let animationFrame = window.requestAnimationFrame(() => {
      animationFrame = null

      motionPreferences.add('(prefers-reduced-motion: no-preference)', () => {
        const registeredImages = new WeakMap()
        const activeCleanups = new Set()
        const compactViewport = window.matchMedia('(max-width: 767px)').matches
        let mutationObserver

        const registerImages = (images) => {
          images.forEach((image) => {
            if (registeredImages.has(image)) return

            const cleanup = createImageEntrance(image, compactViewport)

            const unregister = () => {
              cleanup()
              activeCleanups.delete(unregister)
              registeredImages.delete(image)
            }

            registeredImages.set(image, unregister)
            activeCleanups.add(unregister)
          })
        }

        const unregisterImages = (images) => {
          images.forEach((image) => registeredImages.get(image)?.())
        }

        registerImages(Array.from(scope.querySelectorAll('img')))

        mutationObserver = new MutationObserver((records) => {
          const addedImages = []
          const removedImages = []

          records.forEach((record) => {
            record.removedNodes.forEach((node) => {
              if (!(node instanceof Element)) return

              if (node.matches('img')) removedImages.push(node)
              removedImages.push(...node.querySelectorAll('img'))
            })

            record.addedNodes.forEach((node) => {
              if (!(node instanceof Element)) return

              if (node.matches('img')) addedImages.push(node)
              addedImages.push(...node.querySelectorAll('img'))
            })
          })

          unregisterImages(removedImages)
          registerImages(addedImages)
        })

        mutationObserver.observe(scope, { childList: true, subtree: true })

        return () => {
          mutationObserver?.disconnect()
          activeCleanups.forEach((cleanup) => cleanup())
        }
      })
    })

    return () => {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame)
      }

      motionPreferences.revert()
    }
  }, [animationKey, scopeRef])
}

export default useImageEntranceAnimations
