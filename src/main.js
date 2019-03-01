import {renderFilters, renderCards} from './render-elems';

const filters = document.querySelectorAll(`.filter__input`);

for (const filter of filters) {
  filter.onclick = () => {
    renderCards();
  };
}

renderFilters();
renderCards();
