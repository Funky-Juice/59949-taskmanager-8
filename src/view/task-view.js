import ComponentView from './component';
import {moment} from '../utils';

export default class TaskView extends ComponentView {

  constructor(data) {
    super();
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._picture = data.picture;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;

    this._onEdit = null;
    this._onEditButtonClick = this._onEditButtonClick.bind(this);
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  _onEditButtonClick() {
    return typeof this._onEdit === `function` && this._onEdit();
  }

  bind() {
    this._element.querySelector(`.card__btn--edit`).addEventListener(`click`, this._onEditButtonClick);
  }

  unbind() {
    this._element.querySelector(`.card__btn--edit`).removeEventListener(`click`, this._onEditButtonClick);
  }

  update(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
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
              <span class="card__date">${moment(this._dueDate).format(`DD MMMM`)}</span>
              <span class="card__date">${moment(this._dueDate).format(`h:mm a`)}</span>
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
