import ComponentView from './component';
import {DATA} from '../data/data';
// eslint-disable-next-line
import flatpickr from 'flatpickr';

export default class TaskEditView extends ComponentView {

  constructor(data) {
    super();
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._picture = data.picture;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;

    this._onSubmit = null;
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);

    this._state.isDate = false;
    this._state.isRepeated = false;

    this._onChangeDate = this._onChangeDate.bind(this);
    this._onChangeRepeated = this._onChangeRepeated.bind(this);

    this._onDelete = null;
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  set onDelete(fn) {
    this._onDelete = fn;
  }

  static createMapper(target) {
    return {
      hashtag: (value) => {
        target.tags.push(value);
      },
      text: (value) => {
        target.title = value;
      },
      color: (value) => {
        target.color = value;
      },
      repeat: (value) => {
        target.repeatingDays[value] = true;
      },
      date: (value) => {
        target.dueDate = new Date(value);
        return target.dueDate;
      },
      time: (value) => {
        const date = value.split(`:`);
        target.dueDate.setHours(date[0]);
        target.dueDate.setMinutes(date[1]);
        return target.dueDate;
      }
    };
  }

  _processForm(formData) {
    const entry = {
      title: ``,
      color: ``,
      tags: [],
      dueDate: new Date(),
      repeatingDays: {
        'mo': false,
        'tu': false,
        'we': false,
        'th': false,
        'fr': false,
        'sa': false,
        'su': false,
      }
    };

    const taskEditMapper = TaskEditView.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;

      if (taskEditMapper[property]) {
        taskEditMapper[property](value);
      }
    }
    entry.dueDate = entry.dueDate.getTime();

    return entry;
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();

    const formData = new FormData(this._element.querySelector(`.card__form`));
    const newData = this._processForm(formData);

    if (typeof this._onSubmit === `function`) {
      this._onSubmit(newData);
    }

    this.update(newData);
  }

  _onDeleteButtonClick() {
    if (typeof this._onDelete === `function`) {
      this._onDelete();
    }
  }

  bind() {
    this._element.querySelector(`.card__form`).addEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__delete`).addEventListener(`click`, this._onDeleteButtonClick);
    this._element.querySelector(`.card__date-deadline-toggle`).addEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`).addEventListener(`click`, this._onChangeRepeated);

    this._element.querySelector(`.card__date`).flatpickr({
      altInput: true,
      altFormat: `j F`,
      dateFormat: `Y-m-d`,
      defaultDate: this._dueDate
    });

    this._element.querySelector(`.card__time`).flatpickr({
      enableTime: true,
      noCalendar: true,
      altInput: true,
      altFormat: `h:i K`,
      dateFormat: `H:i`,
      defaultDate: this._dueDate
    });
  }

  unbind() {
    this._element.querySelector(`.card__form`).removeEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__delete`).removeEventListener(`click`, this._onDeleteButtonClick);
    this._element.querySelector(`.card__date-deadline-toggle`).removeEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`).removeEventListener(`click`, this._onChangeRepeated);
  }

  update(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._dueDate = data.dueDate;
  }

  _onChangeDate() {
    this._state.isDate = !this._state.isDate;
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _onChangeRepeated() {
    this._state.isRepeated = !this._state.isRepeated;
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }

  get template() {
    return `\
    <article class="card card--edit card--${this._color} ${this._isRepeated() && `card--repeat`}">
      <form class="card__form" method="get">
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
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >${this._title}</textarea>
            </label>
          </div>
  
          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${this._state.isDate ? `yes` : `no`}</span>
                </button>
  
                <fieldset class="card__date-deadline" ${!this._state.isDate && `disabled`}>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__date"
                      type="text"
                      placeholder="23 September"
                      name="date"
                    />
                  </label>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__time"
                      type="text"
                      placeholder="11:15 PM"
                      name="time"
                    />
                  </label>
                </fieldset>
  
                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">${this._state.isRepeated ? `yes` : `no`}</span>
                </button>
  
                <fieldset class="card__repeat-days" ${!this._state.isRepeated && `disabled`}>
                    <div class="card__repeat-days-inner">
                      ${Object.keys(this._repeatingDays).map((day, i) => `\
                        <input
                          class="visually-hidden card__repeat-day-input"
                          type="checkbox"
                          id="repeat-${day}-${i}"
                          name="repeat"
                          value="${day}"
                          ${this._repeatingDays[day] && `checked`}
                        />
                        <label class="card__repeat-day" for="repeat-${day}-${i}">${day}</label>
                      `.trim()).join(``)}
                  </div>
                </fieldset>
              </div>
  
              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${this._tags.map((tag) => `\
                    <span class="card__hashtag-inner">
                    <input
                      type="hidden"
                      name="hashtag"
                      value="${tag}"
                      class="card__hashtag-hidden-input"
                    />
                    <button type="button" class="card__hashtag-name">
                      #${tag}
                    </button>
                    <button type="button" class="card__hashtag-delete">
                      delete
                    </button>
                  </span>
                  `.trim()).join(``)}
                </div>
  
                <label>
                  <input
                    type="text"
                    class="card__hashtag-input"
                    name="hashtag-input"
                    placeholder="Type new hashtag here"
                  />
                </label>
              </div>
            </div>
  
            <label class="card__img-wrap">
              <input
                type="file"
                class="card__img-input visually-hidden"
                name="img"
              />
              <img
                src="https:${this._picture}"
                alt="task picture"
                class="card__img"
              />
            </label>
  
            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                ${DATA.COLORS.map((color, i) => `\
                  <input
                    type="radio"
                    id="color-${color}-${i}"
                    class="card__color-input card__color-input--${color} visually-hidden"
                    name="color"
                    value="${color}"
                    ${color === this._color && `checked`}
                  />
                  <label
                    for="color-${color}-${i}"
                    class="card__color card__color--${color}">
                    ${color}
                  </label>
                  `.trim()).join(``)}
              </div>
            </div>
          </div>
  
          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`.trim();
  }
}
