import {renderFilters, renderTasks} from './screen/tasks-screen';
import {filtersList} from './data/data';
import Provider from './services/provider';
import Api from './services/api';
import './menu';

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const API_URL = `https://es8-demo-srv.appspot.com/task-manager`;

const messageContainer = document.querySelector(`.board__no-tasks`);
const tasksContainer = document.querySelector(`.board__tasks`);

export const api = new Api(API_URL, AUTHORIZATION);

const storage = {};
export const provider = new Provider({api, storage});

export let tasksData = [];

export const fetchTasks = () => {
  messageContainer.innerText = `Loading tasks...`;
  messageContainer.classList.remove(`visually-hidden`);
  tasksContainer.innerHTML = ``;

  provider.getTasks()
    .then((tasks) => {
      messageContainer.classList.add(`visually-hidden`);
      tasksData = tasks;
      renderFilters(filtersList, tasksData);
      renderTasks(tasksData);
    })
    .catch(() => {
      messageContainer.innerHTML = `Something went wrong while loading your tasks.
      Check your connection or try again later.`;
    });
};

fetchTasks();
