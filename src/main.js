import {renderFilters, renderTasks} from './screen/tasks-screen';
import {filtersList} from './data/data';
import Api from './api';
import './menu';

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const API_URL = `https://es8-demo-srv.appspot.com/task-manager`;

const api = new Api(API_URL, AUTHORIZATION);

export let tasksData = [];

api.getTasks().then((tasks) => {
  tasksData = tasks;
  renderFilters(filtersList, tasksData);
  renderTasks(tasksData);
});
