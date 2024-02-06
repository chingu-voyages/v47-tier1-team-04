import app from "./app.js";
import Task from "./utilities/task.js";

export default class Controller {
  init(title) {
    app.view.init(title);
  }

  //Function to clear/reset tasks:
  resetState() {
    this.tasks = [];
    return this;
  }

  //Function to pull in the data from the data.model.json file:
  async seed() {
    await fetch("./js/data/data.model.json")
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
    this.saveData();
  }

  async loadData() {
    localStorage.savedUserData
      ? JSON.parse(localStorage.getItem("savedUserData")).map(
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
      : await this.seed();
  }

  saveData() {
    localStorage.setItem("savedUserData", JSON.stringify(app.tasks));
    app.view.renderSuccessfulSave();
  }

  returnUniqueGroupNames() {
    return [...new Set(app.tasks.map((task) => task.group))];
  }
  returnUniqueCategoryNames() {
    return [...new Set(app.tasks.map((task) => task.category))];
  }
  returnUniqueCategoriesByGroup(group) {
    const categories = this.returnCategoryByGroup(group);
    return [...new Set(categories.map((task) => task.category))];
  }
  returnCategoryByGroup(group) {
    return app.tasks.filter((task) => task.group === group);
  }
}
