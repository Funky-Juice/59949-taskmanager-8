import {getRandomValFromArr, getRandomDate, getRandomLengthArr, getObjectFromArr} from '../utils';

export const data = {
  TITLE: [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`],
  TAGS: [`homework`, `theory`, `practice`, `intensive`, `keks`],
  COLORS: [`black`, `yellow`, `blue`, `green`, `pink`],
  DAYS: [`Mo`, `Tu`, `We`, `Th`, `Fr`, `Sa`, `Su`]
};

export const dataTemplate = {
  title: getRandomValFromArr(data.TITLE),
  dueDate: getRandomDate(7),
  tags: getRandomLengthArr(data.TAGS, 3),
  picture: `http://picsum.photos/100/100?r=${Math.random()}`,
  color: getRandomValFromArr(data.COLORS),
  repeatingDays: getObjectFromArr(data.DAYS),
  isFavorite: false,
  isDone: false
};

export const filtersList = [
  {
    name: `all`,
    count: 15
  },
  {
    name: `overdue`,
    count: 0
  },
  {
    name: `today`,
    count: 0
  },
  {
    name: `favorites`,
    count: 7
  },
  {
    name: `repeating`,
    count: 2
  },
  {
    name: `tags`,
    count: 6
  },
  {
    name: `archive`,
    count: 115
  }
];
