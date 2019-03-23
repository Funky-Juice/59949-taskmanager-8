import {renderCharts, destroyCharts} from './screen/stats-screen';

const boardContainer = document.querySelector(`.board.container`);
const statisticContainer = document.querySelector(`.statistic.container`);

const tasksBtn = document.getElementById(`control__task`);
const statsBtn = document.getElementById(`control__statistic`);


statsBtn.addEventListener(`click`, () => {
  boardContainer.classList.add(`visually-hidden`);
  statisticContainer.classList.remove(`visually-hidden`);

  renderCharts();
});

tasksBtn.addEventListener(`click`, () => {
  statisticContainer.classList.add(`visually-hidden`);
  boardContainer.classList.remove(`visually-hidden`);

  destroyCharts();
});
