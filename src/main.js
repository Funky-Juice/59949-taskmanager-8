import {renderFilters, renderTasks} from './screen/tasks-screen';
import {filtersList} from './data/data';
import Provider from './services/provider';
import Api from './services/api';
import Store from './services/store';
import './menu';

const messageContainer = document.querySelector(`.board__no-tasks`);
const tasksContainer = document.querySelector(`.board__tasks`);


const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const API_URL = `https://es8-demo-srv.appspot.com/task-manager`;
const TASKS_STORE_KEY = `tasks-store-key`;

const api = new Api(API_URL, AUTHORIZATION);
const store = new Store({key: TASKS_STORE_KEY, storage: localStorage});
export const provider = new Provider({api, store});

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
