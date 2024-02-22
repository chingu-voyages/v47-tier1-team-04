/**
 * @controller This file contains the Controller class which serves as the main controller for the application.
 * It handles the initialization of the app, creation of tasks, data management, and updating the view.
 * The Controller class is responsible for interacting with the app's model and view components.
 */

import app from "./app.js";
import Task from "./utilities/Task.js";
import renderSuccessfulSave from "./views/utils/save.js";

export default class Controller {
  /**
   * Initializes the application with the specified title.
   * @param {string} title - The title of the application.
   */
  init(title) {
    app.state.title ? app.state.title : (app.state.title = title); // If we have a title, we set it to the app state
    app.view.appViewController.init(); // Initializes the app view
  }

  /**
   * Creates a new task and adds it to the app's tasks array.
   * @param {object} task - The task object to be created.
   * @returns {Task} The newly created task.
   */
  newTask = (task) => new Task(task);

  /**
   * Resets the state of the application by clearing the tasks array.
   */
  resetState() {
    app.tasks = [];
  }

  toggleDarkMode() {
    app.state.darkMode = !app.state.darkMode;
    this.saveData(false);
  }

  /**
   * Restores the archived tasks by moving them from the archive array to the tasks array.
   * Updates the view after restoring the tasks.
   */
  restoreArchivedTasks() {
    app.tasks = app.tasks.concat(app.archive);
    app.archive = [];
    app.view.appViewController.updateApp();
  }

  /**
   * Fetches the data from the data.model.json file and creates new tasks based on the data.
   * @returns {Promise} A promise that resolves when the data is fetched and tasks are created.
   */
  async seed() {
    await fetch("./js/data/data.model.json")
      .then((res) => res.json())
      .then((data) => data.map((task) => this.newTask(task)));
  }

  /**
   * Loads the data from the local storage or seeds the data if no data is found.
   * @returns {Promise} A promise that resolves when the data is loaded or seeded.
   */
  async loadData() {
    let storage, parsedStorage, state; // Defining some temp variables
    if (localStorage) {
      storage = localStorage.getItem("savedUserData"); // Checks if we have local storage and gets it if we do
      if (storage && JSON.parse(storage).state && JSON.parse(storage).state) {
        state = JSON.parse(storage).state;
        app.state = state || {}; // If we have state, we set it to the app state
      }
      if (app.state.darkMode) document.body.classList.add("dark-mode");
    }
    if (storage) parsedStorage = JSON.parse(storage).tasks; // Getting the saved data from local storage
    // This is a ternary statement that maps over storage and creates a new task or calls this.seed if there is no local data stored
    parsedStorage
      ? parsedStorage.map((task) => this.newTask(task))
      : await this.seed();
  }

  /**
   * Saves the app data to the local storage.
   * @param {boolean} bool - Indicates whether to show a successful save message or not.
   */
  saveData(bool) {
    localStorage.setItem("savedUserData", JSON.stringify(app)); // Storing the entire app, including any user settings
    if (bool) renderSuccessfulSave(); // If false, saves to localStorage but doesn't show message
  }

  /**
   * Adds a new task to the app's tasks array and updates the view.
   * @param {object} task - The task object to be added.
   */
  addTask(task) {
    app.view.taskViewController.addTask(this.newTask(task));
    this.saveData(false);
    app.view.appViewController.removePopup();
  }

  /**
   * Archives a task by calling its archive method, removes the task from the view, and updates the view.
   * @param {Task} task - The task to be removed.
   */
  removeTask(task) {
    task.archive();
    app.view.taskViewController.removeTask(task);
    app.view.asideViewController.updateAside();
    this.saveData(false);
  }

  /**
   * Cycles the priority of a task, updates the task in the view, and saves the data.
   * @param {Task} task - The task to cycle the priority.
   */
  cyclePriority(task) {
    task.cyclePriority();
    this.saveData(false);
  }

  /**
   * Updates a task with new data, updates the task in the view, and saves the data.
   * @param {Task} task - The task to be updated.
   * @param {object} updatedTask - The updated task object.
   */
  updateTask(task, updatedTask) {
    task.update(updatedTask);
    app.view.taskViewController.updateTask(task);
    this.saveData(false);
    app.view.appViewController.removePopup();
  }
  updateCategory(oldCategory, newCategory) {
    if (oldCategory === newCategory) return;
    app.tasks = app.tasks.forEach((task) => {
      if (task.category === oldCategory) {
        task.category = newCategory;
      }
      this.saveData(false);
    });
  }
  /**
   * Formats a string to be safe for use as an id or class name.
   * @param {string} str - The string to be formatted.
   * @returns {string} The formatted string.
   */
  formatString(str) {
    return str
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/([\s_'"+=/:;]+)/g, "-")
      .toLowerCase();
  }

  /**
   * Returns an array of unique group names from the app's tasks.
   * @returns {string[]} An array of unique group names.
   */
  returnUniqueGroupNames() {
    return [...new Set(app.tasks.map((task) => task.group))];
  }

  /**
   * Returns an array of unique category names from the app's tasks.
   * @returns {string[]} An array of unique category names.
   */
  returnUniqueCategoryNames() {
    return [...new Set(app.tasks.map((task) => task.category))];
  }

  /**
   * Returns an array of unique category names for a specific group.
   * @param {string} group - The group name.
   * @returns {string[]} An array of unique category names for the specified group.
   */
  returnUniqueCategoriesByGroup(group) {
    const categories = this.returnCategoryByGroup(group);
    return [...new Set(categories.map((task) => task.category))];
  }

  /**
   * Returns an array of tasks for a specific group.
   * @param {string} group - The group name.
   * @returns {Task[]} An array of tasks for the specified group.
   */
  returnCategoryByGroup(group) {
    return app.tasks.filter((task) => task.group === group);
  }
}
