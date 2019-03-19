import TaskView from './view/task-view';
import TaskEditView from './view/task-edit-view';
import FilterView from './view/filter-view';
import {filterTasks} from './utils';


const filtersContainer = document.querySelector(`.main__filter`);
const tasksContainer = document.querySelector(`.board__tasks`);

export const renderFilters = (filters, tasks) => {
  filtersContainer.innerHTML = ``;

  filters.forEach((filter) => {
    const filterComponent = new FilterView(filter);
    filtersContainer.appendChild(filterComponent.render());

    filterComponent.onFilter = () => {
      const filteredTasks = filterTasks(tasks, filterComponent.name);
      renderTasks(filteredTasks);
    };
  });
};

export const renderTasks = (tasks) => {
  tasksContainer.innerHTML = ``;

  tasks.forEach((task) => {
    if (task.isDeleted) {
      return;
    }
    const taskComponent = new TaskView(task);
    const taskEditComponent = new TaskEditView(task);

    tasksContainer.appendChild(taskComponent.render());

    taskComponent.onEdit = () => {
      taskEditComponent.render();
      tasksContainer.replaceChild(taskEditComponent.element, taskComponent.element);
      taskComponent.unrender();
    };

    taskEditComponent.onSubmit = (newObject) => {
      task.title = newObject.title;
      task.tags = newObject.tags;
      task.color = newObject.color;
      task.repeatingDays = newObject.repeatingDays;
      task.dueDate = newObject.dueDate;

      taskComponent.update(task);
      taskComponent.render();
      tasksContainer.replaceChild(taskComponent.element, taskEditComponent.element);
      taskEditComponent.unrender();
    };

    taskEditComponent.onDelete = () => {
      task.isDeleted = true;
      taskEditComponent.unrender();
    };
  });
};
