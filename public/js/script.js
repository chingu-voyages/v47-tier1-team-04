(function () {
  // declare a class to contain all application data
  class App {
    constructor() {
      this.tasks = [];
    }
    // Method to initialize app:
    init() {
      this.resetState();
      this.seed();
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
      return await fetch("./js/data.model.json")
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
      return [...new Set(this.tasks.map((task) => task.group))];
    }
    returnUniqueCategoryNames() {
      return [...new Set(this.tasks.map((task) => task.category))];
    }
    returnUniqueCategories() {
      return [...new Set(this.tasks.map((task) => task))];
    }
    returnByGroup(group) {
      return this.tasks.filter((task) => task.group === group);
    }
    returnByCategory(category) {
      return this.tasks.filter((task) => task.category === category);
    }
    returnCategoryByGroup(group) {
      return this.tasks.filter((task) => task.group === group);
    }
    returnUniqueCategoriesByGroup(group) {
      const categories = this.returnCategoryByGroup(group);
      return [...new Set(categories.map((task) => task.category))];
    }
    createTask(name, group, category, frequency, days, calendar) {
      return new Task(name, group, category, frequency, days, calendar);
    }
    readAllTasks() {
      return this.tasks;
    }
    readTask(id) {
      const task = this.tasks.filter((task) => task.id === `task_${id}`)[0];
      return task.read();
    }
    updateTask(id, [...args]) {
      return this.readTask(id).update(...args);
    }
    deleteTask(id) {
      return this.tasks.filter((task) => task.id === `task_${id}`)[0].delete();
    }
    renderSidebar() {
      this.returnUniqueGroupNames().map((group) => {
        createEle(
          "div",
          `
            <h3>${group}<i class="fa-solid fa-circle-chevron-down"></i></h3>
              <ul id="${kebabCase(group)}">
              </ul>
            `,
          document.getElementById("daily-checklist"),
          "activity"
        );
        this.returnUniqueCategoriesByGroup(group).map((category) =>
          createEle("li", category, document.getElementById(kebabCase(group)))
        );
      });
    }
  }
  const app = new App();
  // Function for creating new elements quickly
  const createEle = (ele, content, anchor, classList) => {
    const container = document.createElement(ele);
    container.innerHTML = content;
    if (classList) container.classList = classList;
    anchor.append(container);
    return container;
  };
  // Object constructor to create new tasks:
  let ti = 1; // sets task index at 1
  const resetIndex = () => (ti = 1); // creates function to reset index if needed
  const kebabCase = (string) =>
    string
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/[\s_]+/g, "-")
      .toLowerCase();
  class Task {
    constructor(name, group, category, frequency, days, calendar) {
      this.id = `task_${ti}`; // creates a task id for each task created
      ti++; // increments task index
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
    // method to delete a task:
    delete() {
      let index = app.tasks.indexOf(this);
      if (index > -1) app.tasks.splice(index, 1);
      return app.tasks;
    }
  }
  class View {
    constructor(ele, content, anchor, classList) {
      const container = document.createElement(ele);
      container.innerHTML = content;
      if (classList) container.classList = classList;
      anchor.append(container);
      return container;
    }
  }

  /**************************LOGGING EXAMPLES BELOW************************** */

  (function () {
    // logs a successful creation of a task into the application
    console.log(
      app.createTask(
        "demonstrating the power of JavaScript Classes",
        "Group Example I",
        "Category",
        "Daily",
        [],
        []
      )
    );
    // demonstrates how to read a task after it has been created (select by the id)
    console.log(app.readTask(1));
    // demonstrates how to update a task afer it has been created
    console.log(
      app.updateTask(1, [
        "harnessing the true versatility of that vanilla JS offers.",
        "Team 4 Tasks",
        "FrontEnd",
        "Daily",
        [],
        [],
      ])
    );
    // demonstrates how to delete a task using its id
    console.log(app.deleteTask(1));
    // demonstrates how to seed the "database" with json file
    console.log(app.seed());
    // demonstrates the successful retrieval of all tasks using the readAllTasks method on app
    setTimeout(() => console.log(app.readAllTasks()), 500);
    // demonstrates the resetState function
    setTimeout(() => console.log(app.resetState()), 1500);
    // demonstrates the init function which runs the resetState then seed function
    setTimeout(() => console.log(app.init()), 3000);
    // demonstrates the use of returnByGroup for returning tasks within a particular group
    setTimeout(() => console.log(app.returnByGroup("STUDYING")), 5000);
    // demonstrates the use of returnByCategory for returning tasks within a particular category
    setTimeout(() => console.log(app.returnByCategory("Node Js Course")), 6000);
    // demonstrates the use of returnUniqueGroupNames
    setTimeout(() => console.log(app.returnUniqueGroupNames()), 7200);
    // demonstrates the use of returnUniqueCategoryNames
    setTimeout(() => console.log(app.returnUniqueCategoryNames()), 7400);
    // demonstrates the use of returnByUniqueGroups to get an array of separate array of task objects for each group
    setTimeout(() => console.log(app.returnUniqueGroupTasks()), 7500);
    // demonstrates the use of returnByUniqueCategories to get an array of separate array of task objects for each category
    setTimeout(() => console.log(app.returnUniqueCategoryTasks()), 7750);
    // demonstrates the use of renderSidebar method to render html
    setTimeout(() => console.log(app.renderSidebar()), 80);
  })();
})();
