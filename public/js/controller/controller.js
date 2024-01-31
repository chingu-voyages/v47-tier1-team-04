import Task from "../model/task/task.js";
import app from "../model/model.js";
import { resetIndex } from "../utils/utils.js";
// declares controller class
export default class Controller {
  constructor() {}
  init(title){
    app.view.init(title)
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
  // finds the unique groups within tasks then returns a filtered array with only the tasks within that gr
  returnUniqueGroupTasks() {
    return this.returnUniqueGroupNames().map((group) =>
      this.returnByGroup(group)
    );
  }
  returnUniqueCategoryTasks() {
    return this.returnUniqueCategoryNames().map((category) =>
      this.returnByCategory(category)
    );
  }
  returnUniqueGroupNames() {
    return [...new Set(app.tasks.map((task) => task.group))];
  }
  returnUniqueCategoryNames() {
    return [...new Set(app.tasks.map((task) => task.category))];
  }
  returnUniqueCategories() {
    return [...new Set(app.tasks.map((task) => task))];
  }
  returnByGroup(group) {
    return app.tasks.filter((task) => task.group === group);
  }
  returnByCategory(category) {
    return app.tasks.filter((task) => task.category === category);
  }
  returnCategoryByGroup(group) {
    return app.tasks.filter((task) => task.group === group);
  }
  returnUniqueCategoriesByGroup(group) {
    const categories = this.returnCategoryByGroup(group);
    return [...new Set(categories.map((task) => task.category))];
  }
  createTask(name, group, category, frequency, days, calendar) {
    return new Task(name, group, category, frequency, days, calendar);
  }
  readAllTasks() {
    return app.tasks;
  }
  readTask(id) {
    const task = app.tasks.filter((task) => task.id === `task_${id}`)[0];
    return task.read();
  }
  updateTask(id, [...args]) {
    return this.readTask(id).update(...args);
  }
  // method to delete task by ID by using the .delete method on the
  
}
