import { useRef } from 'react';
import DealsCatalogSection from '../../components/DealsCatalogSection/DealsCatalogSection/DealsCatalogSection';
import DealsHeroSection from '../../components/DealsHeroSection/DealsHeroSection/DealsHeroSection';
import PageLoadingState from '../../components/Utils/PageLoadingState/PageLoadingState';
import { useDealSections } from '../../hooks/data/useDeals';
import usePageEntranceAnimations from '../../hooks/usePageEntranceAnimations';
import styles from './Deals.module.css';

/**
 * Deals
 *
 * Composes the deals route from its promotional hero and grouped deal catalog, both
 * sharing a single fetch of the section data so it isn't requested twice.
 */
function Deals() {
  const pageRef = useRef(null);
  const { sections, isLoading } = useDealSections();

  usePageEntranceAnimations(pageRef);

  if (isLoading) return <PageLoadingState />;

  return (
    <main
      id="main-content"
      ref={pageRef}
      className={styles.dealsPage}
      tabIndex="-1"
    >
      <DealsHeroSection sections={sections} />
      <DealsCatalogSection sections={sections} />
    </main>
  );
}

export default Deals;
