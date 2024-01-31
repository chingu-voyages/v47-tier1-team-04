(function () {
  // declare a class to contain all application data
  class App {
    constructor() {
      this.tasks = [];
    }
    // Method to initialize app:
    async init() {
      this.resetState(); // calls reset state to clear out tasks
      await this.seed(); // awaits json fetch / seed of db
      this.renderSidebar(); // calls the renderSidebar function to update the sidebar view on initialize
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
    async returnByCategory(category) {
      return await this.tasks.filter((task) => task.category === category);
    }
    returnCategoryByGroup(group) {
      return this.tasks.filter((task) => task.group === group);
    }
    returnUniqueCategoriesByGroup(group) {
      const categories = this.returnCategoryByGroup(group);
      return [...new Set(categories.map((task) => task.category))];
    }
    async createTask(name, group, category, frequency, days, calendar) {
      return await new Task(name, group, category, frequency, days, calendar);
    }
    async readAllTasks() {
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
            <h3>${group} <i class="fa-solid fa-circle-chevron-down"></i></h3>
              <ul id="${kebabCase(group)}">
              </ul>
            `,
          document.getElementById("daily-checklist"),
          null,
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
  const createEle = (ele, content, anchor, id, classList) => {
    const container = document.createElement(ele);
    container.innerHTML = content;
    if (id) container.id = id;
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

  /**************************LOGGING EXAMPLES BELOW************************** */

  (async function () {
    // logs a successful creation of a task into the application
    console.log(
      await app.createTask(
        "demonstrating the power of JavaScript Classes",
        "Group Example I",
        "Category",
        "Daily",
        [],
        []
      )
    );
    // demonstrates how to read a task after it has been created (select by the id)
    console.log(await app.readTask(1));
    // demonstrates how to update a task afer it has been created
    console.log(
      await app.updateTask(1, [
        "harnessing the true versatility of that vanilla JS offers.",
        "Team 4 Tasks",
        "FrontEnd",
        "Daily",
        [],
        [],
      ])
    );
    // demonstrates how to delete a task using its id
    console.log(await app.deleteTask(1));
    // demonstrates how to seed the "database" with json file
    console.log(await app.seed());
    // demonstrates the successful retrieval of all tasks using the readAllTasks method on app
    console.log(await app.readAllTasks());
    // demonstrates the resetState function
    console.log(await app.resetState())
    // demonstrates the init function which runs the resetState then seed function and generates sidebar also!
    await app.init();
    // demonstrates the use of returnByGroup for returning tasks within a particular group
    console.log(await app.returnByGroup("STUDYING"));
    // demonstrates the use of returnByCategory for returning tasks within a particular category
    console.log(await app.returnByCategory("Node Js Course"));
    // demonstrates the use of returnUniqueGroupNames
    console.log(await app.returnUniqueGroupNames());
    // demonstrates the use of returnUniqueCategoryNames
    console.log(await app.returnUniqueCategoryNames());
    // demonstrates the use of returnByUniqueGroups to get an array of separate array of task objects for each group
    console.log(await app.returnUniqueGroupTasks());
    // demonstrates the use of returnByUniqueCategories to get an array of separate array of task objects for each category
    console.log(await app.returnUniqueCategoryTasks());
    // demonstrates the use of createEle method to render html on demand
    createEle(
      "li",
      "createEle Example",
      document.getElementById("routine-activities")
    );
  })();
})();
