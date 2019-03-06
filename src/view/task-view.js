import {createElement} from '../utils';

export default class TaskView {

  constructor(data) {
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._picture = data.picture;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;

    this._element = null;
    this._state = {};
    this._onEdit = null;
  }

  get element() {
    return this._element;
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  render() {
    this._element = createElement(this.template);
    this.bind();

    return this._element;
  }

  unrender() {
    this.unbind();
    this._element = null;
  }

  _onEditButtonClick() {
    return typeof this._onEdit === `function` && this._onEdit();
  }

  bind() {
    this._element.querySelector(`.card__btn--edit`).addEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  unbind() {
    this._element.querySelector(`.card__btn--edit`).removeEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  get template() {
    return `\
    <article class="card card--${this._color} ${this._isRepeated() ? `card--repeat` : ``}">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--edit">
            edit
          </button>
          <button type="button" class="card__btn card__btn--archive">
            archive
          </button>
          <button
            type="button"
            class="card__btn card__btn--favorites card__btn--disabled"
          >
            favorites
          </button>
        </div>

        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
          <div
            class="card__text"
            placeholder="Start typing your text here..."
            name="text"
          >${this._title}</div>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <span class="card__date">${new Date(this._dueDate).toLocaleString(`en`, {day: `numeric`, month: `long`})}</span> 
              <span class="card__date">${new Date(this._dueDate).toLocaleString(`en`, {hour: `2-digit`, minute: `2-digit`})}</span> 
            </div>
            <div class="card__hashtag">
              <div class="card__hashtag-list">
                ${this._tags.map((tag) => `\
                  <span class="card__hashtag-inner">                    
                    <button type="button" class="card__hashtag-name">
                      #${tag}
                    </button>
                  </span>
                `.trim()).join(``)}
              </div>
            </div>
          </div>

          <label class="card__img-wrap">
            <img
              src="${this._picture}"
              alt="task picture"
              class="card__img"
            />
          </label>
        </div>
      </div>
    </article>`.trim();
  }
}
