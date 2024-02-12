import app from "./app.js";
import Task from "./utilities/task.js";
import renderContent, { updateContent } from "./views/content/renderContent.js";
import renderSuccessfulSave from "./views/utils/save.js";
import renderContentTask from "./views/content/renderContentTasks.js"
import { removePopup } from "./views/modals/view-task.js";

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
    this.saveData(false);
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
              task.description,
              task.date,
              task.scheduledTime,
              task.complete
            )
        )
      : await this.seed();
  }

  saveData(bool) {
    localStorage.setItem("savedUserData", JSON.stringify(app.tasks));
    if (bool) renderSuccessfulSave();
  }

  updateTask(task, updatedTask) {
    task.update(updatedTask);
    updateContent();
    removePopup();
    this.saveData(false);
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
