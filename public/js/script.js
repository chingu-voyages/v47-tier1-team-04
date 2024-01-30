(function () {
  class App {
    constructor() {
      this.tasks = [];
    }
    // Method to initialize app:
    init() {
      this.seed();
      return this;
    }
    // Method to clear/reset tasks:
    resetState() {
      this.tasks = [];
      return this;
    }
    // Method to pull in the data from the data.model.json file:
    async seed() {
      await fetch("./js/data.model.json")
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
    returnUniqueGroups() {
      const unique = [...new Set(this.tasks.map((task) => task.group))];
      return unique.map((group) => this.returnByGroup(group));
    }
    returnUniqueCategories() {
      const unique = [...new Set(this.tasks.map((task) => task.category))];
      return unique.map((category) => this.returnByCategory(category));
    }
    returnByGroup(group) {
      return this.tasks.filter((task) => task.group === group);
    }
    returnByCategory(category) {
      return this.tasks.filter((task) => task.category === category);
    }
    createTask(name, group, category, frequency, days, calendar) {
      return new Task(name, group, category, frequency, days, calendar);
    }
    readAllTasks() {
      return this.tasks;
    }
    readTask(id) {
      return this.tasks.filter((task) => task.id === `task_${id}`)[0].read();
    }
    updateTask(id, [...args]) {
      return this.readTask(id).update(...args);
    }
    deleteTask(id) {
      return this.tasks.filter((task) => task.id === id)[0].delete();
    }
  }
  const app = new App();
  // Object constructor to create new tasks:
  let ti = 1;  // sets task index at 1 
  class Task {
    constructor(name, group, category, frequency, days, calendar) {
      this.id = `task_${ti + 1}`; // creates a task id for each task created
      ti++; // increments index
      this.name = name;
      this.group = group;
      this.category = category;
      this.frequency = frequency;
      this.days = days;
      this.calendar = calendar;
      this.complete = false;
      app.tasks.push(this);
    }
    read() {
      this.complete = false;
      return this;
    }
    // Method to update a task:
    update(name, group, category, frequency, days, calendar) {
      this.name = name;
      this.group = group;
      this.category = category;
      this.frequency = frequency;
      this.days = days;
      this.calendar = calendar;
      this.complete = false;
      return this;
    }
    delete() {
      let index = app.tasks.indexOf(this);
      if (index > -1) app.tasks.splice(index, 1);
      return app.tasks;
    }
  }
  // initialize app, which also fetches json data and poulates the tasks array with new Tasks
  app.init();
  // demonstrates the successful retrieval of all tasks using the readAllTasks method on app
  setTimeout(() => console.log(app.readAllTasks()), 50);
  // demonstrates the successful retrieval of a single task using the readTask method on app
  setTimeout(() => console.log(app.readTask(14)), 50);
  // demonstrates successfully updating a single task within the tasks array
  setTimeout(
    () =>
      console.log(
        app.updateTask(14, [
          "updated name of task",
          "UPDATED GROUP",
          "Different Category",
          "monthly",
          [],
          [],
        ])
      ),
    50
  );
})();
