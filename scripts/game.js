import Timer from "./timer.js";

export default class Game {
  constructor() {
    this.timer = null;
    this.init();
  }

  init() {
    this.timer = new Timer();
  }
}
