import { useEffect, useRef, useState } from 'react';
import { preload } from 'react-dom';
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import menuSearchBackgroundImage from '../../assets/gallery/1.webp';
import MenuSearchSection from '../../components/MenuSearchSection/MenuSearchSection/MenuSearchSection';
import MenuProductsSection from '../../components/MenuProductsSection/MenuProductsSection/MenuProductsSection';
import PageLoadingState from '../../components/Utils/PageLoadingState/PageLoadingState';
import { useEditMode } from '../../context/EditModeContext';
import { ALL_CATEGORY_ID, useCategoryNavigation } from '../../hooks/data/useCategories';
import { useContent } from '../../hooks/data/useContent';
import { useMenuProductsPage } from '../../hooks/data/useMenuProducts';
import usePageEntranceAnimations from '../../hooks/usePageEntranceAnimations';
import styles from './Menu.module.css';

const PAGE_SIZE = 12;

/**
 * Menu
 *
 * Owns menu search and category-filter state, then asks the server for exactly one
 * page (12) of matching products at a time — see useMenuProductsPage — rather than
 * loading the whole catalog and slicing it client-side. Page number lives in the URL
 * the same way category and search already do, so reloading, sharing a link, or using
 * the browser's back/forward buttons all land back on the same page.
 */
function Menu() {
  preload(menuSearchBackgroundImage, { as: 'image', fetchPriority: 'high' });

  const pageRef = useRef(null);
  const productsRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { category: categorySlug } = useParams();
  const initialQuery = new URLSearchParams(location.search).get('q') || '';
  // AdminLiveEditor mounts this exact page inside /admin/editor — none of its
  // filters should actually navigate there, since Menu normally does that via the
  // app's single router (setSearchParams/navigate), which would otherwise carry the
  // admin straight out of the editor and onto the real public /menu route.
  const edit = useEditMode();
  const { content: menuContent } = useContent('menu');
  const {
    isLoading: isLoadingCategories,
    menuCategoryOptions,
    menuCategorySlugMap,
    getMenuCategoryPath,
  } = useCategoryNavigation();
  // Editable text is separate from the submitted filter to avoid searching per keystroke.
  const [searchText, setSearchText] = useState(initialQuery);
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    menuCategorySlugMap[categorySlug] || ALL_CATEGORY_ID,
  );
  const [submittedQuery, setSubmittedQuery] = useState(initialQuery);

  usePageEntranceAnimations(pageRef);

  useEffect(() => {
    // URL state remains authoritative for browser history and direct navigation.
    const searchParam = new URLSearchParams(location.search).get('q') || '';
    setSearchText(searchParam);
    setSubmittedQuery(searchParam);
    setSelectedCategoryId(
      menuCategorySlugMap[categorySlug] || ALL_CATEGORY_ID,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorySlug, location.search, isLoadingCategories]);

  const requestedPage = Math.max(1, Number(searchParams.get('page')) || 1);

  const {
    menuProducts,
    pagination,
    isLoading: isLoadingProducts,
    isFetching,
  } = useMenuProductsPage({
    categoryId: selectedCategoryId,
    query: submittedQuery,
    page: requestedPage,
    pageSize: PAGE_SIZE,
  });

  // Never shown as "current" while out of range — see the clamp effect below, which
  // corrects the URL itself once the server's real total is known.
  const page = Math.min(requestedPage, pagination.totalPages);

  // Corrects the URL once the server reports fewer pages than requested — e.g. a
  // search narrows the results while sitting on page 4 of what used to be a longer
  // list. Skipped while a request is still in flight: pagination briefly still
  // reflects the *previous* filter's totals then, and clamping against that would
  // fight the real numbers arriving a moment later.
  useEffect(() => {
    if (isFetching || requestedPage <= pagination.totalPages) return;

    setSearchParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        if (pagination.totalPages <= 1) next.delete('page');
        else next.set('page', String(pagination.totalPages));
        return next;
      },
      { replace: true },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestedPage, pagination.totalPages, isFetching]);

  // Null for "All" — MenuResultsSummary treats that as "nothing to announce", the same
  // as an empty search: browsing the whole catalog needs no result message at all.
  const selectedCategoryLabel =
    selectedCategoryId === ALL_CATEGORY_ID
      ? null
      : menuCategoryOptions.find((option) => option.value === selectedCategoryId)?.label || null;

  // preserveScroll tells RouteScrollManager to leave the scroll position alone for
  // this navigation — the category dropdown changes the URL's pathname (a genuine
  // route change, which RouteScrollManager would otherwise reset to the very top of
  // the page for), but it should land the customer on the results grid instead (see
  // below), not back up at the search banner.
  const navigateToMenu = (categoryId, query, { preserveScroll = false } = {}) => {
    const basePath = getMenuCategoryPath(categoryId);
    const path = query ? `${basePath}?q=${encodeURIComponent(query)}` : basePath;
    navigate(path, preserveScroll ? { state: { preserveScroll: true } } : undefined);
  };

  const handleCategoryChange = (event) => {
    if (edit) return;
    const nextCategoryId = event.target.value;
    setSelectedCategoryId(nextCategoryId);
    // A fresh path with no `page` in it — building it from scratch (rather than
    // patching the current search params) is what resets pagination back to page 1
    // for the new category, the same way it already resets for a new search below.
    navigateToMenu(nextCategoryId, submittedQuery, { preserveScroll: true });
    // Lands the customer on the new results' first row — see MenuProductsSection —
    // instead of leaving them wherever they'd scrolled to for the previous filter.
    productsRef.current?.scrollToTop();
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (edit) return;
    const queryValue = searchText.trim();

    setSearchText(queryValue);
    setSubmittedQuery(queryValue);
    navigateToMenu(selectedCategoryId, queryValue);
    productsRef.current?.scrollToTop();
  };

  const handlePageChange = (nextPage) => {
    if (edit) return;
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous);
      if (nextPage <= 1) next.delete('page');
      else next.set('page', String(nextPage));
      return next;
    });
  };

  if (isLoadingCategories || isLoadingProducts) return <PageLoadingState />;

  if (categorySlug && !menuCategorySlugMap[categorySlug]) {
    return <Navigate to="/menu" replace />;
  }

  return (
    <main
      id="main-content"
      ref={pageRef}
      className={styles.menuPage}
      tabIndex="-1"
    >
      <MenuSearchSection
        backgroundImageUrl={menuContent?.searchBanner?.backgroundImage || menuSearchBackgroundImage}
        categoryOptions={menuCategoryOptions}
        selectedCategoryId={selectedCategoryId}
        onCategoryChange={handleCategoryChange}
        searchValue={searchText}
        onSearchChange={(event) => setSearchText(event.target.value)}
        onSubmit={handleSearchSubmit}
      />

      <MenuProductsSection
        ref={productsRef}
        products={menuProducts}
        page={page}
        totalPages={pagination.totalPages}
        totalItems={pagination.total}
        pageSize={PAGE_SIZE}
        isFetching={isFetching}
        onPageChange={handlePageChange}
        searchQuery={submittedQuery.trim()}
        categoryLabel={selectedCategoryLabel}
      />
    </main>
  );
}

export default Menu;
