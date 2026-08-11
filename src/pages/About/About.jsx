import { useRef } from 'react'
import BiteXStorySection from '../../components/BiteXStorySection/BiteXStorySection/BiteXStorySection'
import MissionSection from '../../components/MissionSection/MissionSection/MissionSection'
import QualityPromiseSection from '../../components/QualityPromiseSection/QualityPromiseSection/QualityPromiseSection'
import FreshIngredientsSection from '../../components/FreshIngredientsSection/FreshIngredientsSection/FreshIngredientsSection'
import usePageEntranceAnimations from '../../hooks/usePageEntranceAnimations'
import styles from './About.module.css'

/**
 * About
 *
 * Composes the brand-story route from the mission, quality, and company narrative
 * sections.
 */
function About() {
  const pageRef = useRef(null)

  usePageEntranceAnimations(pageRef)

  return (
    <main
      id="main-content"
      ref={pageRef}
      className={styles.aboutPage}
      tabIndex="-1"
    >
      <BiteXStorySection />
      <MissionSection />
      <QualityPromiseSection />
      <FreshIngredientsSection />
    </main>
  )
}

export default About
