'use strict';

const filtersList = [
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

const filtersContainer = document.querySelector(`.main__filter`);

const filterTemplate = `\
    ${filtersList.map((filter, i) => `\
        <input
          type="radio"
          id="filter__${filter.name}"
          class="filter__input visually-hidden"
          name="filter"
          ${i === 0 ? `checked` : ``}
          ${filter.count < 1 ? `disabled` : ``}
        />
        <label for="filter__${filter.name}" class="filter__label">
          ${filter.name} <span class="filter__${filter.name}-count">${filter.count}</span>
        </label>`).join(``)}`;

const renderFilters = () => {
  filtersContainer.innerHTML = ``;
  filtersContainer.innerHTML = filterTemplate;
};

renderFilters();
