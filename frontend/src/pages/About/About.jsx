import { useRef } from 'react'
import BiteXStorySection from '../../components/BiteXStorySection/BiteXStorySection/BiteXStorySection'
import MissionSection from '../../components/MissionSection/MissionSection/MissionSection'
import QualityPromiseSection from '../../components/QualityPromiseSection/QualityPromiseSection/QualityPromiseSection'
import FreshIngredientsSection from '../../components/FreshIngredientsSection/FreshIngredientsSection/FreshIngredientsSection'
import PageLoadingState from '../../components/Utils/PageLoadingState/PageLoadingState'
import { useContent } from '../../hooks/data/useContent'
import usePageEntranceAnimations from '../../hooks/usePageEntranceAnimations'
import styles from './About.module.css'

/**
 * About
 *
 * Composes the brand-story route from the mission, quality, and company narrative
 * sections. Waits for the API-backed content before mounting so the GSAP
 * scroll-reveal setup below measures the page's final layout (its trigger positions
 * are calculated once and don't recalculate as async content changes page height).
 */
function About() {
  const pageRef = useRef(null)
  const { content, isLoading } = useContent('about')

  usePageEntranceAnimations(pageRef, isLoading)

  if (isLoading) return <PageLoadingState />

  return (
    <main
      id="main-content"
      ref={pageRef}
      className={styles.aboutPage}
      tabIndex="-1"
    >
      <BiteXStorySection content={content.story} />
      <MissionSection content={content.mission} />
      <QualityPromiseSection content={content.qualityPromise} />
      <FreshIngredientsSection content={content.freshIngredients} />
    </main>
  )
}

export default About
