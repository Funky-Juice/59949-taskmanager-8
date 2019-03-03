import {renderFilters, renderTasks} from './render-elems';

renderFilters();
renderTasks();

const filters = document.querySelectorAll(`.filter__input`);

for (const filter of filters) {
  filter.onclick = () => {
    renderTasks();
  };
}
