import Controller from "../controller/controller.js";
import View from "../view/view.js";

export class Model {
  constructor() {
    this.controller = new Controller();
    this.view = new View("div", ``, document.body, "app", "container");
    this.tasks = [];
    this.views = [];
  }
  // Method to initialize app:
  async init(title) {
    this.controller.resetState(); // calls reset state to clear out tasks
    await this.controller.seed(); // awaits json fetch / seed of db
    this.controller.init(title);
    return this;
  }
}
const app = new Model();
export default app;
