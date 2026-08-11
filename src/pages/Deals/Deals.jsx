import { useRef } from 'react';
import DealsCatalogSection from '../../components/DealsCatalogSection/DealsCatalogSection/DealsCatalogSection';
import DealsHeroSection from '../../components/DealsHeroSection/DealsHeroSection/DealsHeroSection';
import usePageEntranceAnimations from '../../hooks/usePageEntranceAnimations';
import styles from './Deals.module.css';

/**
 * Deals
 *
 * Composes the deals route from its promotional hero and grouped deal catalog.
 */
function Deals() {
  const pageRef = useRef(null);

  usePageEntranceAnimations(pageRef);

  return (
    <main
      id="main-content"
      ref={pageRef}
      className={styles.dealsPage}
      tabIndex="-1"
    >
      <DealsHeroSection />
      <DealsCatalogSection />
    </main>
  );
}

export default Deals;
