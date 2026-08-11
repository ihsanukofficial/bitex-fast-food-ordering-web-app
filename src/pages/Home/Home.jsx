import { useRef } from 'react'
import HeroSection from '../../components/Hero/HeroSection/HeroSection'
import PopularItems from '../../components/PopularItems/PopularItems/PopularItems'
import WhyChooseBiteXSection from '../../components/WhyChooseBiteX/WhyChooseBiteXSection/WhyChooseBiteXSection'
import CallToActionSection from '../../components/CallToAction/CallToActionSection/CallToActionSection'
import CategoriesSection from '../../components/CategoriesSection/CategoriesSection/CategoriesSection'
import usePageEntranceAnimations from '../../hooks/usePageEntranceAnimations'
import styles from './Home.module.css'

/**
 * Home
 *
 * Composes the primary landing route from independent marketing and menu-discovery
 * sections.
 */
function Home() {
  const pageRef = useRef(null)

  usePageEntranceAnimations(pageRef)

  return (
    <main id="main-content" ref={pageRef} className={styles.home} tabIndex="-1">
      <HeroSection />
      <PopularItems />
      <CategoriesSection />
      <WhyChooseBiteXSection />
      <CallToActionSection />
    </main>
  )
}

export default Home;
