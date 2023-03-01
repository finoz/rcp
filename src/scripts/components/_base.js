export default class Base {
  constructor(el) {
    this.log = "Start finoz/base";
    this._setEl(el);
    this._setOptions(el);
  }
  _setEl(el) {
    Object.defineProperty(this, "$el", {
      value: el,
      writable: false,
      enumerable: true,
    });
  }
  _setOptions(el) {
    let optionKeys = Object.keys(el.dataset).filter((key) =>
      key.includes("option")
    );
    let options = {};
    optionKeys.forEach((key) => {
      let optionName = key.replace("option", "").toLocaleLowerCase();
      options[optionName] = el.dataset[key];
    });
    Object.defineProperty(this, "$options", {
      value: options,
      writable: false,
      enumerable: true,
    });
  }
}
