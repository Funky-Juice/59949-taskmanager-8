import filterTemplate from './templates/filter-template';
import {dataTemplate} from './data/data';
import TaskView from './view/task-view';

const filtersContainer = document.querySelector(`.main__filter`);
const tasksContainer = document.querySelector(`.board__tasks`);

export const renderFilters = () => {
  filtersContainer.innerHTML = ``;
  filtersContainer.innerHTML = filterTemplate;
};

export const renderTasks = () => {
  tasksContainer.innerHTML = ``;

  const task = new TaskView(dataTemplate());
  task.render(tasksContainer);
};
