import filterTemplate from './templates/filter-template';
import cardTemplate from './templates/card-template';

const filtersContainer = document.querySelector(`.main__filter`);
const cardsContainer = document.querySelector(`.board__tasks`);

export const renderFilters = () => {
  filtersContainer.innerHTML = ``;
  filtersContainer.innerHTML = filterTemplate;
};

export const renderCards = () => {
  const num = Math.floor(Math.random() * 8) + 1;

  cardsContainer.innerHTML = ``;
  cardsContainer.innerHTML = cardTemplate.repeat(num);
};
