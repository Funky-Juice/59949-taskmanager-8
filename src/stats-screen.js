import flatpickr from 'flatpickr';
import {moment} from './utils';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.plugins.unregister(ChartDataLabels);


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


const daysCtx = document.querySelector(`.statistic__days`);
const tagsCtx = document.querySelector(`.statistic__tags`).getContext(`2d`);
const colorsCtx = document.querySelector(`.statistic__colors`).getContext(`2d`);

let daysChart = new Chart(daysCtx, {
  plugins: [ChartDataLabels],
  type: `line`,
  data: {
    labels: [`01 FEB`, `02 FEB`, `03 FEB`, `04 FEB`, `05 FEB`, `06 FEB`, `07 FEB`],
    datasets: [{
      data: [4, 6, 3, 1, 5, 2, 0],
      backgroundColor: `transparent`,
      borderColor: `#000000`,
      borderWidth: 1,
      lineTension: 0,
      pointRadius: 8,
      pointHoverRadius: 8,
      pointBackgroundColor: `#000000`
    }]
  },
  options: {
    plugins: {
      datalabels: {
        font: {
          size: 8
        },
        color: `#ffffff`
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          display: false
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }],
      xAxes: [{
        ticks: {
          fontStyle: `bold`,
          fontColor: `#000000`
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }]
    },
    legend: {
      display: false
    },
    layout: {
      padding: {
        top: 10
      }
    },
    tooltips: {
      enabled: false
    }
  }
});

let tagsChart = new Chart(tagsCtx, {
  plugins: [ChartDataLabels],
  type: `pie`,
  data: {
    labels: [`#watchstreams`, `#relaxation`, `#coding`, `#sleep`, `#watermelonpies`],
    datasets: [{
      data: [20, 15, 10, 5, 2],
      backgroundColor: [`#ff3cb9`, `#ffe125`, `#0c5cdd`, `#000000`, `#31b55c`]
    }]
  },
  options: {
    plugins: {
      datalabels: {
        display: false
      }
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const allData = data.datasets[tooltipItem.datasetIndex].data;
          const tooltipData = allData[tooltipItem.index];
          const total = allData.reduce((acc, it) => acc + parseFloat(it));
          const tooltipPercentage = Math.round((tooltipData / total) * 100);
          return `${tooltipData} TASKS — ${tooltipPercentage}%`;
        }
      },
      displayColors: false,
      backgroundColor: `#ffffff`,
      bodyFontColor: `#000000`,
      borderColor: `#000000`,
      borderWidth: 1,
      cornerRadius: 0,
      xPadding: 15,
      yPadding: 15
    },
    title: {
      display: true,
      text: `DONE BY: TAGS`,
      fontSize: 16,
      fontColor: `#000000`
    },
    legend: {
      position: `left`,
      labels: {
        boxWidth: 15,
        padding: 25,
        fontStyle: 500,
        fontColor: `#000000`,
        fontSize: 13
      }
    }
  }
});

let colorsChart = new Chart(colorsCtx, {
  plugins: [ChartDataLabels],
  type: `pie`,
  data: {
    labels: [`#pink`, `#yellow`, `#blue`, `#black`, `#green`],
    datasets: [{
      data: [5, 25, 15, 10, 30],
      backgroundColor: [`#ff3cb9`, `#ffe125`, `#0c5cdd`, `#000000`, `#31b55c`]
    }]
  },
  options: {
    plugins: {
      datalabels: {
        display: false
      }
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const allData = data.datasets[tooltipItem.datasetIndex].data;
          const tooltipData = allData[tooltipItem.index];
          const total = allData.reduce((acc, it) => acc + parseFloat(it));
          const tooltipPercentage = Math.round((tooltipData / total) * 100);
          return `${tooltipData} TASKS — ${tooltipPercentage}%`;
        }
      },
      displayColors: false,
      backgroundColor: `#ffffff`,
      bodyFontColor: `#000000`,
      borderColor: `#000000`,
      borderWidth: 1,
      cornerRadius: 0,
      xPadding: 15,
      yPadding: 15
    },
    title: {
      display: true,
      text: `DONE BY: COLORS`,
      fontSize: 16,
      fontColor: `#000000`
    },
    legend: {
      position: `left`,
      labels: {
        boxWidth: 15,
        padding: 25,
        fontStyle: 500,
        fontColor: `#000000`,
        fontSize: 13
      }
    }
  }
});


export const renderCharts = () => {
  return daysChart && tagsChart && colorsChart;
};

export const destroyCharts = () => {
  daysChart = null;
  tagsChart = null;
  colorsChart = null;
};
