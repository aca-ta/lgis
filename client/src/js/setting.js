export default class Setting {
  constructor(id) {
    this.data = this.load(id);
  }

  load(id) {
    const elm = document.querySelector(id);
    return JSON.parse(elm.value);
  }
}
