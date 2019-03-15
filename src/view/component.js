import {createElement} from '../utils';

export default class ComponentView {

  constructor() {
    if (new.target === ComponentView) {
      throw new Error(`Can't instantiate ComponentView, only concrete one.`);
    }

    this._element = null;
    this._state = {};
  }

  get element() {
    return this._element;
  }

  get template() {
    throw new Error(`Template method should be implemented`);
  }

  render() {
    this._element = createElement(this.template);
    this.bind();

    return this._element;
  }

  unrender() {
    this.unbind();
    this._element.remove();
    this._element = null;
  }

  update() {}

  bind() {
    // By default there is nothing to bind
  }

  unbind() {
    // By default nothing to clear
  }

}
