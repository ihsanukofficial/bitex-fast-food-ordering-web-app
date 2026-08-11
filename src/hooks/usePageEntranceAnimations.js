import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useImageEntranceAnimations from './useImageEntranceAnimations'

gsap.registerPlugin(ScrollTrigger)

const COLLECTION_ITEM_SELECTOR = [
  '[data-category-card]',
  '[data-hero-item]',
  '[aria-label="Product information"] > *',
  'article',
  'fieldset',
  'form',
  'ul > li',
  'dl > div',
  'a[aria-label^="View "][aria-label$=" details"]',
  '[aria-label="BiteX highlights"] > span',
].join(', ')

const TEXT_SELECTOR = 'h1, h2, p, a, button'
const VISUAL_SELECTOR = 'figure, [data-hero-item]'

function hasCollectionAncestor(element) {
  return Boolean(element.parentElement?.closest(COLLECTION_ITEM_SELECTOR))
}

function getSectionTargets(section) {
  const belongsToSection = (element) =>
    !section.matches('section') || element.closest('section') === section

  const collectionItems = gsap.utils
    .toArray(COLLECTION_ITEM_SELECTOR, section)
    .filter(
      (element) =>
        belongsToSection(element) && !hasCollectionAncestor(element),
    )

  const textItems = gsap.utils.toArray(TEXT_SELECTOR, section).filter((element) => {
    if (
      !belongsToSection(element) ||
      element.closest(COLLECTION_ITEM_SELECTOR) ||
      element.closest('figure') ||
      element.matches('button[aria-label]')
    ) {
      return false
    }

    return !element.matches('[aria-hidden="true"]')
  })

  const visualItems = gsap.utils.toArray(VISUAL_SELECTOR, section).filter((element) => {
    if (
      !belongsToSection(element) ||
      element.matches(COLLECTION_ITEM_SELECTOR) ||
      hasCollectionAncestor(element) ||
      element.closest('h1, h2')
    ) {
      return false
    }

    return true
  })

  return { collectionItems, textItems, visualItems }
}

function sortByDocumentOrder(elements) {
  return elements.sort((first, second) => {
    if (first === second) return 0

    return first.compareDocumentPosition(second) & 4 ? -1 : 1
  })
}

function groupByParent(targets) {
  const parentGroups = new Map()

  targets.forEach((target) => {
    const parent = target.parentElement
    if (!parent) return

    const siblings = parentGroups.get(parent) || []
    siblings.push(target)
    parentGroups.set(parent, siblings)
  })

  return Array.from(parentGroups.values()).map(sortByDocumentOrder)
}

function groupContiguousTargets(targets) {
  const groups = []

  groupByParent(targets).forEach((siblings) => {
    let currentGroup = []
    let previousIndex = -2

    siblings.forEach((target) => {
      const targetIndex = Array.prototype.indexOf.call(
        target.parentElement.children,
        target,
      )

      if (targetIndex !== previousIndex + 1 && currentGroup.length) {
        groups.push(currentGroup)
        currentGroup = []
      }

      currentGroup.push(target)
      previousIndex = targetIndex
    })

    if (currentGroup.length) groups.push(currentGroup)
  })

  return groups
}

function groupCollectionRows(targets) {
  const groups = []

  groupByParent(targets).forEach((siblings) => {
    let currentRow = []
    let currentTop = null

    siblings.forEach((target) => {
      const targetTop = target.getBoundingClientRect().top

      if (currentTop !== null && Math.abs(targetTop - currentTop) > 24) {
        groups.push(currentRow)
        currentRow = []
      }

      currentRow.push(target)
      currentTop = targetTop
    })

    if (currentRow.length) groups.push(currentRow)
  })

  return groups
}

function addEntrance(timeline, targets, animation, position) {
  if (!targets.length) return

  timeline.from(
    targets,
    {
      autoAlpha: 0,
      duration: 0.72,
      ease: 'power3.out',
      stagger: 0.075,
      clearProps: 'transform,opacity,visibility',
      ...animation,
    },
    position,
  )
}

/**
 * Adds consistent, one-time entrance motion to the semantic sections of a page.
 * Visible content plays on mount; later content waits until it enters the viewport.
 */
function usePageEntranceAnimations(pageRef, animationKey) {
  useImageEntranceAnimations(pageRef, animationKey)

  useLayoutEffect(() => {
    const page = pageRef.current
    if (!page) return undefined

    const motionPreferences = gsap.matchMedia()
    let animationFrame = window.requestAnimationFrame(() => {
      animationFrame = null

      motionPreferences.add('(prefers-reduced-motion: no-preference)', () => {
        const context = gsap.context(() => {
          const semanticSections = Array.from(page.querySelectorAll('section'))
          const sections = semanticSections.length
            ? semanticSections
            : Array.from(page.children)
          const compactViewport = window.matchMedia('(max-width: 767px)').matches

          sections.forEach((section) => {
            const { collectionItems, textItems, visualItems } =
              getSectionTargets(section)
            const animationGroups = [
              ...groupContiguousTargets(textItems).map((targets) => ({
                targets,
                animation: { y: compactViewport ? 18 : 24 },
              })),
              ...groupContiguousTargets(visualItems).map((targets) => ({
                targets,
                animation: {
                  y: compactViewport ? 14 : 18,
                  scale: compactViewport ? 0.985 : 0.975,
                },
              })),
              ...groupCollectionRows(collectionItems).map((targets) => ({
                targets,
                animation: {
                  y: compactViewport ? 16 : 22,
                  scale: 0.985,
                },
              })),
            ]

            animationGroups.forEach(({ targets, animation }) => {
              const timeline = gsap.timeline({
                scrollTrigger: {
                  trigger: targets[0],
                  start: compactViewport ? 'top 90%' : 'top 84%',
                  once: true,
                },
              })

              addEntrance(timeline, targets, animation, 0)
            })
          })
        }, page)

        return () => context.revert()
      })
    })

    return () => {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame)
      }

      motionPreferences.revert()
    }
  }, [animationKey, pageRef])
}

export default usePageEntranceAnimations
