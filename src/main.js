import {renderFilters, renderTasks} from './render-elems';

renderFilters();
renderTasks();

const filters = document.querySelectorAll(`.filter__input`);

for (const filter of filters) {
  filter.onclick = () => {
    const qty = Math.floor(Math.random() * 7) + 1;
    renderTasks(qty);
  };
}
