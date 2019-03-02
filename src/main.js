import {renderFilters, renderCards} from './render-elems';

renderFilters();
renderCards();

const filters = document.querySelectorAll(`.filter__input`);

for (const filter of filters) {
  filter.onclick = () => {
    renderCards();
  };
}
