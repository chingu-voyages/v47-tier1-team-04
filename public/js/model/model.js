import Controller from "../controller/controller.js";
import View from "../view/view.js";
import Task from "./task/task.js";
import { resetIndex } from "../utils/utils.js";
export default class Model {
  constructor() {
    this.controller = new Controller();
    this.view = new View("div", ``, document.body, "app", "container");
    this.tasks = [];
    this.views = [];
  }
  // Method to initialize app:
  async init() {
    this.resetState(); // calls reset state to clear out tasks
    await this.seed(); // awaits json fetch / seed of db
    return this;
  }
  // Method to clear/reset tasks:
  resetState() {
    this.tasks = [];
    resetIndex();
    return this;
  }
  // Method to pull in the data from the data.model.json file:
  async seed() {
    return await fetch("./js/model/data.model.json")
      .then((res) => res.json())
      .then((data) =>
        data.map(
          (task) =>
            new Task(
              task.name,
              task.group,
              task.category,
              task.frequency,
              task.days,
              task.calendar
            )
        )
      );
  }
}
export const app = new Model();
