import Controller from "./controller.js";
import View from './views/view.index.js';

class Model {
  constructor() {
    this.tasks = [];
    this.views = [];
    this.archive = [];
    this.view = new View(
      "div",
      "<!--Code injected by Amanda-->",
      document.body,
      "app",
      "container"
    );
    this.controller = new Controller();
  }
  //Function to initialize app:
  async init(title) {
    await this.controller.loadData();
    this.controller.init(title);
    return this;
  }
}
const app = new Model();
export default app;

