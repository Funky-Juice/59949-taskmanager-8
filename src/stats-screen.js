import flatpickr from 'flatpickr';
import {moment} from './utils';
import daysChart from './charts/days-chart';
import tagsChart from './charts/tags-chart';
import colorsChart from './charts/colors-chart';
import {chartsDataAdapter} from './utils';
import {tasksData} from './data/data';

const totalTasksElem = document.querySelector(`.statistic__task-found`);

const weekStart = moment().isoWeekday(0);
const weekEnd = moment().isoWeekday(6);

const calendar = flatpickr(`.statistic__period-input`, {
  locale: {
    rangeSeparator: ` — `
  },
  mode: `range`,
  enableTime: false,
  dateFormat: `j F`,
  defaultDate: [weekStart._d, weekEnd._d],
  onChange(selectedDates) {
    if (selectedDates.length === 2) {
      destroyCharts();
      renderCharts(selectedDates);
    }
  }
});


let daysChartLink;
let tagsChartLink;
let colorsChartLink;

export const renderCharts = (datesRange = [calendar.selectedDates[0], calendar.selectedDates[1]]) => {
  const chartsData = chartsDataAdapter(tasksData, datesRange);

  daysChartLink = daysChart(chartsData);
  tagsChartLink = tagsChart(chartsData);
  colorsChartLink = colorsChart(chartsData);

  totalTasksElem.innerHTML = chartsData.total;
};

export const destroyCharts = () => {

  if (daysChartLink) {
    daysChartLink.destroy();
  }
  if (tagsChartLink) {
    tagsChartLink.destroy();
  }
  if (colorsChartLink) {
    colorsChartLink.destroy();
  }
};
