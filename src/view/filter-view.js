import ComponentView from './component';

export default class FilterView extends ComponentView {

  constructor(data) {
    super();
    this._name = data.name;
    this._count = data.count;

    this._onFilter = null;
    this._onFilterClick = this._onFilterClick.bind(this);
  }

  get name() {
    return this._name;
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  _onFilterClick() {
    return typeof this._onFilter === `function` && this._onFilter();
  }

  bind() {
    this._element.querySelector(`.filter__label`).addEventListener(`click`, this._onFilterClick);
  }

  unbind() {
    this._element.querySelector(`.filter__label`).removeEventListener(`click`, this._onFilterClick);
  }

  get template() {
    return `\
    <div>
      <input
        type="radio"
        id="filter__${this._name}"
        class="filter__input visually-hidden"
        name="filter"
        ${this._name === `all` && `checked`}
        ${this._count < 1 && `disabled`}
      />
      <label for="filter__${this._name}" class="filter__label">
        ${this._name} <span class="filter__${this._name}-count">${this._count}</span>
      </label>
    </div>`.trim();
  }
}
