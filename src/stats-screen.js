import flatpickr from 'flatpickr';
import {moment} from './utils';
import daysChart from './charts/days-chart';
import tagsChart from './charts/tags-chart';
import colorsChart from './charts/colors-chart';
import {chartsDataAdapter} from './utils';
import {tasksData} from './data/data';


const weekStart = moment().isoWeekday(0);
const weekEnd = moment().isoWeekday(6);

flatpickr(`.statistic__period-input`, {
  locale: {
    rangeSeparator: ` — `
  },
  mode: `range`,
  enableTime: false,
  dateFormat: `j F`,
  defaultDate: [weekStart._d, weekEnd._d]
});


let daysChartLink;
let tagsChartLink;
let colorsChartLink;

export const renderCharts = () => {
  const chartsData = chartsDataAdapter(tasksData);

  daysChartLink = daysChart(chartsData);
  tagsChartLink = tagsChart(chartsData);
  colorsChartLink = colorsChart(chartsData);
};

export const destroyCharts = () => {
  daysChartLink.destroy();
  tagsChartLink.destroy();
  colorsChartLink.destroy();
};
