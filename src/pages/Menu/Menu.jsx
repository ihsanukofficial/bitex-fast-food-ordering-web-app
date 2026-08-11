import { useEffect, useMemo, useRef, useState } from 'react';
import { preload } from 'react-dom';
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import menuSearchBackgroundImage from '../../assets/gallery/1.webp';
import MenuSearchSection from '../../components/MenuSearchSection/MenuSearchSection/MenuSearchSection';
import MenuProductsSection from '../../components/MenuProductsSection/MenuProductsSection/MenuProductsSection';
import {
  ALL_CATEGORY_ID,
  getMenuCategoryPath,
  menuCategoryOptions,
  menuCategorySlugMap,
  menuProducts,
} from '../../data/menuCatalog';
import usePageEntranceAnimations from '../../hooks/usePageEntranceAnimations';
import styles from './Menu.module.css';

/**
 * Menu
 *
 * Owns menu search and category-filter state, then derives the visible product
 * collection for the route.
 */
function Menu() {
  preload(menuSearchBackgroundImage, { as: 'image', fetchPriority: 'high' });

  const pageRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { category: categorySlug } = useParams();
  const initialQuery = new URLSearchParams(location.search).get('q') || '';
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
  }, [categorySlug, location.search]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = submittedQuery.trim().toLowerCase();

    return menuProducts.filter((product) => {
      const matchesCategory =
        selectedCategoryId === ALL_CATEGORY_ID ||
        product.categoryId === selectedCategoryId;
      const matchesSearch =
        product.title.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategoryId, submittedQuery]);

  const navigateToMenu = (categoryId, query) => {
    const basePath = getMenuCategoryPath(categoryId);
    navigate(query ? `${basePath}?q=${encodeURIComponent(query)}` : basePath);
  };

  const handleCategoryChange = (event) => {
    const nextCategoryId = event.target.value;
    setSelectedCategoryId(nextCategoryId);
    navigateToMenu(nextCategoryId, submittedQuery);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const queryValue = searchText.trim();

    if (!queryValue) {
      setSearchText('');
      setSubmittedQuery('');
      setSelectedCategoryId(ALL_CATEGORY_ID);
      navigate('/menu');
      return;
    }

    setSubmittedQuery(queryValue);
    navigateToMenu(selectedCategoryId, queryValue);
  };

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
        backgroundImageUrl={menuSearchBackgroundImage}
        categoryOptions={menuCategoryOptions}
        selectedCategoryId={selectedCategoryId}
        onCategoryChange={handleCategoryChange}
        searchValue={searchText}
        onSearchChange={(event) => setSearchText(event.target.value)}
        onSubmit={handleSearchSubmit}
      />

      <MenuProductsSection products={filteredProducts} />
    </main>
  );
}

export default Menu;
