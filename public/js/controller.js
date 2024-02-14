import app from "./app.js";
import Task from "./utilities/task.js";
import renderSuccessfulSave from "./views/utils/save.js";

export default class Controller {
  init(title) {
    app.view.init(title);
  }

  //Function to clear/reset tasks:
  resetState() {
    app.tasks = [];
  }
  restoreArchivedTasks() {
    app.tasks = app.tasks.concat(app.archive);
    app.archive = [];
    app.view.updateView();
  }
  //Function to pull in the data from the data.model.json file:
  async seed() {
    await fetch("./js/data/data.model.json")
      .then((res) => res.json())
      .then((data) => data.map((task) => new Task(task)));
  }
  async loadData() {
    let storage, parsedStorage;//Defining some temp variables
    if (localStorage) storage = localStorage.getItem("savedUserData");//Checks if we have local storage and gets it if we do
    if (storage) parsedStorage = JSON.parse(storage).tasks;//Getting the saved data from local storage

    //This is ternary statement that maps over storage and creates a new task or calls this.seed if there is no local data stored
    parsedStorage
      ? parsedStorage.map((task) => new Task(task))
      : await this.seed();
  }

  saveData(bool) {
    localStorage.setItem("savedUserData", JSON.stringify(app));
    if (bool) renderSuccessfulSave();
  }

  addTask(task) {
    new Task(task);
    app.view.updateView();
    this.saveData(false);
  }

  removeTask(task) {
    task.archive();
    app.view.updateView();
    this.saveData(false);
  }
  cyclePriority(task) {
    task.cyclePriority();
    app.view.updateView();
    this.saveData(false);
  }
  updateTask(task, updatedTask) {
    task.update(updatedTask);
    app.view.updateView();
    this.saveData(false);
  }
  toggleCategory(group, category) {
    app.view.toggleCategory(group, category);
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
