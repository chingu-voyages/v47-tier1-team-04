(function () {

  // declare initial values
  let vi = 0; // sets view index at 1
  let ti = 1; // sets task index at 1
  const resetView = () => (vi = 1);
  const resetIndex = () => (app.ti = 1); // creates function to reset task index if needed
  const kebabCase = (str) =>
    str
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/[\s_]+/g, "-")
      .toLowerCase();
  // declares controller class
  class Controller {
    constructor() {}
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
    deleteTask(id) {
      return app.tasks.filter((task) => task.id === `task_${id}`)[0].delete();
    }
  }

  // declares a class for handling any view or user interface changes
  class View {
    constructor(ele, content, anchor, id, classList) {
      const element = document.createElement(ele);
      element.innerHTML = content;
      if (id) {
        element.id = id;
        this.id = id;
      } else {
        element.id = `view_${vi}`;
        this.id = vi;
        vi++;
      }
      if (classList) element.classList = classList;
      anchor.append(element);
      this.element = element;
      return this;
    }
    createView(ele, content, anchor, id, classList) {
      app.views.push(this);
      return new View(ele, content, anchor, id, classList);
    }
    init(title) {
      this.renderAside(title);
      this.renderNavbar();
    }
    renderAside(title) {
      const aside = this.createView(
        "aside",
        `<div class="avatar-area">
          <div class="avatar">
            <img
              src="./img/Friendly Ones Avatar and Backdrop.png"
              alt="avatar pict"
            />
          </div>
          <div class="gear-icon">
            <img src="./img/solar_settings-linear.svg" alt="gear icon" />
          </div>
        </div>
        <h2>${title}</h2>
        <div id="daily-checklist">
        </div>
        </div>`,
        document.getElementById("app"),
        "aside-el",
        "aside"
      );
      app.controller.returnUniqueGroupNames().map((group) => {
        app.view.createView(
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
        app.controller
          .returnUniqueCategoriesByGroup(group)
          .map((category) =>
            app.view.createView(
              "li",
              category,
              document.getElementById(kebabCase(group))
            )
          );
      });
      return aside;
    }
    renderNavbar() {
      return this.createView(
        "nav",
        `
      <div class="navbar-top">
          <i class="fa-solid fa-bars menu-btn fa-2x" id="menu-btn"></i>
          <div id="date" class="date">Today:</div>
          <div class="btn-undo">
            <button class="btn undo">
              <img src="./img/ci_undo.svg" alt="undo button" />
              undo
            </button>
            <button class="btn undo">
              <img src="./img/ci_redo.svg" alt="redo button" />
              undo
            </button>
            <a href="#" class="btn btn-save">Save</a>
          </div>
        </div>
        <div class="navbtn">
          <a href="#" class="btn-day">Today</a>
          <a href="#" class="btn-month">Month</a>
          <a href="#" class="btn-year">Year</a>
        </div>`,
        document.getElementById('app'),
        "navbar",
        "navbar"
      );
    }
    deleteEle(id) {
      return document.getElementById(id).remove();
    }
    delete() {
      let index = this.views.indexOf(this);
      if (index > -1) {
        this.element.remove();
        this.views.splice(index, 1);
      }
      return this.views;
    }
  }
  // declare a class to contain all application data
  class Model {
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

    renderSidebar() {
      // this.returnUniqueGroupNames().map((group) => {
      //   new View(
      //     "div",
      //     `
      //       <h3>${group} <i class="fa-solid fa-circle-chevron-down"></i></h3>
      //         <ul id="${kebabCase(group)}">
      //         </ul>
      //       `,
      //     document.getElementById("daily-checklist"),
      //     null,
      //     "activity"
      //   );
      //   this.returnUniqueCategoriesByGroup(group).map(
      //     (category) =>
      //       new View("li", category, document.getElementById(kebabCase(group)))
      //   );
      // });
    }
  }
  const app = new Model();
  // Object constructor to create new tasks:
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
      app.controller.createTask(
        "demonstrating the power of JavaScript Classes",
        "Group Example I",
        "Category",
        "Daily",
        [],
        []
      )
    );
    // demonstrates how to read a task after it has been created (select by the id)
    console.log(app.controller.readTask(1));
    // demonstrates how to update a task afer it has been created
    console.log(
      app.controller.updateTask(1, [
        "harnessing the true versatility of that vanilla JS offers.",
        "Team 4 Tasks",
        "FrontEnd",
        "Daily",
        [],
        [],
      ])
    );
    // demonstrates how to delete a task using its id
    //console.log(app.controller.deleteTask(1));
    // demonstrates how to seed the "database" with json file
    console.log(app.seed());
    // demonstrates the successful retrieval of all tasks using the readAllTasks method on app
    console.log(app.controller.readAllTasks());
    // demonstrates the resetState function
    console.log(app.resetState());
    // demonstrates the init function which runs the resetState then seed function and generates sidebar also!
    await app.init();
    // demonstrates the use of returnByGroup for returning tasks within a particular group
    console.log(app.controller.returnByGroup("STUDYING"));
    // demonstrates the use of returnByCategory for returning tasks within a particular category
    console.log(app.controller.returnByCategory("Node Js Course"));
    // demonstrates the use of returnUniqueGroupNames
    console.log(app.controller.returnUniqueGroupNames());
    // demonstrates the use of returnUniqueCategoryNames
    console.log(app.controller.returnUniqueCategoryNames());
    // demonstrates the use of returnByUniqueGroups to get an array of separate array of task objects for each group
    console.log(app.controller.returnUniqueGroupTasks());
    // demonstrates the use of returnByUniqueCategories to get an array of separate array of task objects for each category
    console.log(app.controller.returnUniqueCategoryTasks());
    // demonstrates the use of createEle method to render html on demand
    // new View(
    //   "li",
    //   "createEle Example",
    //   document.body
    // );

    // demonstrate the ability to delete on demand
    //app.views[0].delete();
    //console.log(app.view.views);
    // app.controller.init()
    console.log(app.view);
    //console.log(app.view.createView('div','content folks', document.body))
    //setTimeout(console.log(app.view.views[0]), 10);
    console.log(app.view.init("My Daily Checklist"));
  })();
})();
