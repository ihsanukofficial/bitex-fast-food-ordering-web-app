import Container from '../../Utils/Container/Container';
import MenuCategoryDropdown from '../MenuCategoryDropdown/MenuCategoryDropdown';
import MenuSearchBanner from '../MenuSearchBanner/MenuSearchBanner';
import MenuSearchContent from '../MenuSearchContent/MenuSearchContent';
import MenuSearchField from '../MenuSearchField/MenuSearchField';
import MenuSearchForm from '../MenuSearchForm/MenuSearchForm';
import MenuSearchSubmitButton from '../MenuSearchSubmitButton/MenuSearchSubmitButton';

/**
 * MenuSearchSection
 *
 * Presents the controlled menu search form while leaving query and category ownership
 * with the route.
 */
function MenuSearchSection({
  backgroundImageUrl,
  categoryOptions,
  selectedCategoryId,
  onCategoryChange,
  searchValue,
  onSearchChange,
  onSubmit,
  isLoading = false,
}) {
  return (
    <Container>
      <MenuSearchBanner backgroundImageUrl={backgroundImageUrl}>
        <MenuSearchContent>
          <MenuSearchForm onSubmit={onSubmit}>
            <MenuCategoryDropdown
              categoryOptions={categoryOptions}
              selectedCategoryId={selectedCategoryId}
              onChange={onCategoryChange}
            />
            <MenuSearchField
              value={searchValue}
              onChange={onSearchChange}
            />
            <MenuSearchSubmitButton isLoading={isLoading} />
          </MenuSearchForm>
        </MenuSearchContent>
      </MenuSearchBanner>
    </Container>
  );
}

export default MenuSearchSection;
