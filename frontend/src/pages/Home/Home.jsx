import { useRef } from 'react'
import HeroSection from '../../components/Hero/HeroSection/HeroSection'
import PopularItems from '../../components/PopularItems/PopularItems/PopularItems'
import WhyChooseBiteXSection from '../../components/WhyChooseBiteX/WhyChooseBiteXSection/WhyChooseBiteXSection'
import CallToActionSection from '../../components/CallToAction/CallToActionSection/CallToActionSection'
import CategoriesSection from '../../components/CategoriesSection/CategoriesSection/CategoriesSection'
import PageLoadingState from '../../components/Utils/PageLoadingState/PageLoadingState'
import { useContent } from '../../hooks/data/useContent'
import { useCategories } from '../../hooks/data/useCategories'
import usePageEntranceAnimations from '../../hooks/usePageEntranceAnimations'
import styles from './Home.module.css'

/**
 * Home
 *
 * Composes the primary landing route from independent marketing and menu-discovery
 * sections. Waits for the API-backed content each section renders before mounting,
 * so the GSAP scroll-reveal setup below measures the page's final layout instead of
 * a shorter, not-yet-populated one (its trigger positions are calculated once and
 * don't recalculate as async content changes page height).
 */
function Home() {
  const pageRef = useRef(null)
  const { content, isLoading: isLoadingContent } = useContent('home')
  const { categories, isLoading: isLoadingCategories } = useCategories()
  const isReady = !isLoadingContent && !isLoadingCategories

  usePageEntranceAnimations(pageRef, isReady)

  if (!isReady) return <PageLoadingState />

  return (
    <main id="main-content" ref={pageRef} className={styles.home} tabIndex="-1">
      <HeroSection
        eyebrow={content.hero.eyebrow}
        headline={content.hero.headline}
        subHeadline={content.hero.subHeadline}
        highlights={content.hero.highlights}
        images={content.hero.images}
      />
      <PopularItems content={content.popularItems} />
      <CategoriesSection categories={categories} content={content.categoriesSection} />
      <WhyChooseBiteXSection content={content.whyChooseBiteX} />
      <CallToActionSection content={content.cta} />
    </main>
  )
}

export default Home;
