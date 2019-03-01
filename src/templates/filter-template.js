import {filtersList} from '../data/data';

export default `\
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
