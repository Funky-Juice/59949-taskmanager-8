import filterTemplate from './templates/filter-template';
import {dataTemplate} from './data/data';
import TaskView from './view/task-view';
import TaskEditView from './view/task-edit-view';

const filtersContainer = document.querySelector(`.main__filter`);
const tasksContainer = document.querySelector(`.board__tasks`);

export const renderFilters = () => {
  filtersContainer.innerHTML = ``;
  filtersContainer.innerHTML = filterTemplate;
};

export const renderTasks = () => {
  const taskData = dataTemplate();
  tasksContainer.innerHTML = ``;

  const taskComponent = new TaskView(taskData);
  const taskEditComponent = new TaskEditView(taskData);

  tasksContainer.appendChild(taskComponent.render());

  taskComponent.onEdit = () => {
    taskEditComponent.render();
    tasksContainer.replaceChild(taskEditComponent.element, taskComponent.element);
    taskComponent.unrender();
  };

  taskEditComponent.onSubmit = (newObject) => {
    taskData.title = newObject.title;
    taskData.tags = newObject.tags;
    taskData.color = newObject.color;
    taskData.repeatingDays = newObject.repeatingDays;
    taskData.dueDate = newObject.dueDate;

    taskComponent.update(taskData);
    taskComponent.render();
    tasksContainer.replaceChild(taskComponent.element, taskEditComponent.element);
    taskEditComponent.unrender();
  };
};
