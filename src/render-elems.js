import filterTemplate from './templates/filter-template';
import taskTemplate from './templates/task-template';

const filtersContainer = document.querySelector(`.main__filter`);
const cardsContainer = document.querySelector(`.board__tasks`);

export const renderFilters = () => {
  filtersContainer.innerHTML = ``;
  filtersContainer.innerHTML = filterTemplate;
};

export const renderTasks = () => {
  const num = Math.floor(Math.random() * 8) + 1;

  cardsContainer.innerHTML = ``;
  cardsContainer.innerHTML = taskTemplate.repeat(num);
};
