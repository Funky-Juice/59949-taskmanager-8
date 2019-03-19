import {getRandomValFromArr, getRandomDate, getRandomLengthArr, getObjectFromArr} from '../utils';

export const DATA = {
  TITLE: [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`],
  TAGS: [`homework`, `theory`, `practice`, `intensive`, `keks`],
  COLORS: [`black`, `yellow`, `blue`, `green`, `pink`],
  DAYS: [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`]
};

export const dataTemplate = () => {
  return {
    title: getRandomValFromArr(DATA.TITLE),
    dueDate: getRandomDate(7),
    tags: getRandomLengthArr(DATA.TAGS, 3),
    picture: `http://picsum.photos/100/100?r=${Math.random()}`,
    color: getRandomValFromArr(DATA.COLORS),
    repeatingDays: getObjectFromArr(DATA.DAYS),
    isFavorite: false,
    isDeleted: false
  };
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
