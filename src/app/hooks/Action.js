export default class Action {
  constructor(label, callback, icon, style) {
    this.label = label;
    this.callback = callback;
    this.icon = icon;
    this.style = style;
  }
}
