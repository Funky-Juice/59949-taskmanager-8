export const moment = require(`moment`);

export const getRandomValFromArr = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const getRandomDate = (daysQty) => {
  const a = Date.now();
  const b = Math.floor(Math.random() * daysQty) * 24 * 60 * 60 * 1000;

  return Math.random() < 0.5 ? (a - b) : (a + b);
};

export const getRandomLengthArr = (arr, qty) => {
  let newArr = [];

  for (let i = 0; i < arr.length; i++) {
    newArr.push(getRandomValFromArr(arr));
  }
  const maxQty = Math.floor(Math.random() * qty + 1);

  return [...new Set(newArr)].slice(0, maxQty);
};

export const getObjectFromArr = (arr) => {
  const newObj = {};

  for (let i = 0; i < arr.length; i++) {
    newObj[arr[i]] = Math.random() >= 0.5;
  }
  return newObj;
};

export const generateData = (template, objectsQty = 7) => {
  const dataList = [];

  for (let i = 0; i < objectsQty; i++) {
    dataList.push(template());
  }
  return dataList;
};

export const createElement = (template) => {
  const elem = document.createElement(`div`);
  elem.innerHTML = template;

  return elem.firstChild;
};

export const filterTasks = (tasks, filterName) => {

  switch (filterName) {
    case `all`:
      return tasks;

    case `overdue`:
      return tasks.filter((it) => it.dueDate < Date.now());

    case `today`:
      return tasks.filter((it) => moment(it.dueDate).format(`YYYY-MM-DD`) === moment(Date.now()).format(`YYYY-MM-DD`));

    case `favorites`:
      return [];

    case `repeating`:
      return tasks.filter((it) => [...Object.entries(it.repeatingDays)].some((rec) => rec[1]));

    case `tags`:
      return [];

    case `archive`:
      return [];

    default:
      return tasks;
  }
};

export const chartsDataAdapter = (tasks) => {
  const daysAmount = {};
  const tagsAmount = {};
  const colorsAmount = {};

  const filteredTasks = tasks.filter((task) => !task.isDeleted);

  const daysArr = filteredTasks.map((task) => task.dueDate);
  daysArr.sort((a, b) => a - b);

  daysArr.forEach((day) => {
    const date = moment(day).format(`DD MMM`);
    daysAmount[date] = (daysAmount[date] || 0) + 1;
  });


  const tagsArr = [];
  filteredTasks.map((task) => {
    task.tags.forEach((tag) => tagsArr.push(tag));
  });

  tagsArr.forEach((tag) => {
    tagsAmount[tag] = (tagsAmount[tag] || 0) + 1;
  });


  const colorsArr = filteredTasks.map((task) => task.color);
  colorsArr.forEach((color) => {
    colorsAmount[color] = (colorsAmount[color] || 0) + 1;
  });

  return {
    days: daysAmount,
    tags: tagsAmount,
    colors: colorsAmount
  };
};
