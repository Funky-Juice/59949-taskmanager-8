import filterTemplate from './templates/filter-template';
import taskTemplate from './templates/task-template';
import {generateData} from './utils';
import {dataTemplate} from './data/data';

const filtersContainer = document.querySelector(`.main__filter`);
const cardsContainer = document.querySelector(`.board__tasks`);

export const renderFilters = () => {
  filtersContainer.innerHTML = ``;
  filtersContainer.innerHTML = filterTemplate;
};

export const renderTasks = (tasksQty) => {
  const tasksData = generateData(dataTemplate, tasksQty);

  cardsContainer.innerHTML = ``;
  cardsContainer.innerHTML = taskTemplate(tasksData);
};
