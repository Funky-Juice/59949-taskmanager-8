import {renderCharts, destroyCharts} from './screen/stats-screen';
import {fetchTasks} from './main';

const filtersContainer = document.querySelector(`.main__filter.container`);
const boardContainer = document.querySelector(`.board.container`);
const statisticContainer = document.querySelector(`.statistic.container`);

const tasksBtn = document.getElementById(`control__task`);
const statsBtn = document.getElementById(`control__statistic`);


statsBtn.addEventListener(`click`, () => {
  boardContainer.classList.add(`visually-hidden`);
  filtersContainer.classList.add(`visually-hidden`);
  statisticContainer.classList.remove(`visually-hidden`);

  destroyCharts();
  renderCharts();
});

tasksBtn.addEventListener(`click`, () => {
  statisticContainer.classList.add(`visually-hidden`);
  boardContainer.classList.remove(`visually-hidden`);
  filtersContainer.classList.remove(`visually-hidden`);

  fetchTasks();
});
