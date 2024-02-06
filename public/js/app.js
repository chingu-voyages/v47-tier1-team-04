import Controller from "./controller.js";
import View from './views/index.js';

class Model {
  constructor() {
    this.tasks = [];
    this.views = [];
    this.view = new View(
      "div",
      " <!--Code injected by Amanda-->",
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
//Object constructor to create new tasks:
export class Task {
  constructor(name, group, category, frequency, days, calander) {
    this.name = name;
    this.group = group;
    this.category = category;
    this.frequency = frequency;
    this.days = days;
    this.calander = calander;
    this.complete = false;
    app.tasks.push(this);
  }
  read() {
    this.complete = false;
    return this;
  }
  //Function to create new tasks:
  update(name, group, category, frequency, days, calander) {
    this.name = name;
    this.group = group;
    this.category = category;
    this.frequency = frequency;
    this.days = days;
    this.calander = calander;
    this.complete = false;
    return this;
  }
}
