import {renderFilters, renderTasks} from './render-elems';
import {dataTemplate} from './data/data';
import {generateData} from './utils';

const tasksData = generateData(dataTemplate);

renderFilters();
renderTasks(tasksData);

const filters = document.querySelectorAll(`.filter__input`);

for (const filter of filters) {
  filter.onclick = () => {
    const tasksCount = Math.floor(Math.random() * 7) + 1;
    const tasks = generateData(dataTemplate, tasksCount);
    renderTasks(tasks);
  };
}
