import Controller from "./controller.js";

export class View {
  // What the app looks like, what the user can see and do, User Interface
  constructor(element, content, anchor, id, classList) {
    const container = document.createElement(element);
    container.innerHTML = content;
    if (id) {
      container.id = id;
      this.id = id;
    } else {
      container.id = `view_${viewIndex}`;
      this.id = container.id;
      viewIndex++;
    }
    if (classList) {
      container.classList = classList;
    }
    anchor.append(container);
    this.container = container;
  }
  init(title) {
    this.renderAsideGroups(title);
    this.renderNavBar();
    this.renderContent();
    this.renderFooter();
  }
  createElement(element, content, anchor, id, classList) {
    const newView = new View(element, content, anchor, id, classList);
    app.views.push(newView);
  }
  renderAside(title) {
    return this.createElement(
      "aside",
      ` <div class="avatar-area">
            <div class="avatar">
                <img src="./img/Friendly Ones Avatar and Backdrop.png" alt="avatar pict">
            </div>
            <div class="gear-icon">
                <img src="./img/solar_settings-linear.svg" alt="gear icon">
            </div>
        </div>            

        <h2>${title}</h2>
            <div id="daily-checklist">

            </div>`,
      document.getElementById("app"),
      "element-el",
      "aside"
    );
  }
  renderAsideGroup(group) {
    console.log(group);
    this.createElement(
      "div",
      `
            
              <h3 id="category-title-1">${group} <i class="fa-solid fa-circle-chevron-down"></i></h3>
              <ul id="sidebar_${group}">
                  
              </ul>
            `,
      document.getElementById("daily-checklist", null, "activity")
    );
  }
  renderAsideGroups(title) {
    console.log(app.controller.returnUniqueGroupNames());
    let aside = this.renderAside(title);
    app.controller.returnUniqueGroupNames().map((group) => {
      this.renderAsideGroup(group);
      app.controller
        .returnUniqueCategoriesByGroup(group)
        .map((category) => this.renderAsideCatagory(category, group));
    });
  }
  renderAsideCatagory(category, group) {
    app.view.createElement(
      "li",
      category,
      document.getElementById(`sidebar_${group}`)
    );
  }

  renderNavBar() {
    return this.createElement(
      "navbar",

      `<nav class="navbar">
            <div class="navbar-top">
                <i class="fa-solid fa-bars menu-btn fa-2x" id="menu-btn"></i>
                <div id="date" class="date">Today:</div>
                <div class="btn-undo">
                    <button class="btn undo">
                        <img src="./img/ci_undo.svg" alt="undo button">
                        undo
                    </button>
                    <button class="btn undo">
                        <img src="./img/ci_redo.svg" alt="redo button">
                        undo
                    </button>
                    <a href="#" class="btn btn-save">Save</a>
                </div>
            </div>            
            <div class="navbtn">
                <a href="#" class="btn-day">Today</a>
                <a href="#" class="btn-month">Month</a>
                <a href="#" class="btn-year">Year</a>      
            </div>
          </nav>`,
      document.getElementById("app"),
      "element-el",
      "navbar"
    );
  }
  renderContent() {
    return this.createElement(
      "content",
      `<content class="content">
          <div class="content-search">
              <div class="priority">
                  <a href="#" class="btn btn-lite btn-blue">Low</a>
                  <a href="#" class="btn btn-lite btn-orange">Med</a>
                  <a href="#" class="btn btn-lite btn-red">High</a>

                  <div class="search">
                      <input type="text" placeholder="">
                      <i class="fa-solid fa-magnifying-glass fa-lg search-icon"></i>
                  </div>
              </div>               
          </div>
          <div class="content-activity">
              <h2 class="category-name" id="category-name-1">Routine Activities</h2>
              <div class="content-main">
                  <img src="./img/Ellipse8.svg" alt="ellipse checkbox" class="ellipse" id="ellipse-el">
                  <div class="content-inner">
                      <div class="content-task">
                          <h3 class="activity" id="activity-title-1-1">Projects</h3> <a href="#" class="btn btn-lite btn-blue">Low</a>
                      </div>
                      <div class="content-description">
                          <p class="task-name" id="task-name-1-1">Update recipes project backlog</p>
                          <div class="content-description-edit">
                              <img src="./img/mynaui_pencil.svg" alt="edit pencil image" class="icon-edit">
                              <img src="./img/ph_trash.svg" alt="delect trash can image" class="icon-edit">
                          </div>                            
                      </div>                        
                  </div>

              </div>  
              <div class="content-activity">
                  <h2 class="category-name" id="category-name-2">Chingu</h2>
                  <div class="content-main">
                      <img src="./img/Ellipse8.svg" alt="ellipse checkbox" class="ellipse" id="ellipse-el">
                      <div class="content-inner">
                          <div class="content-task">
                              <h3 class="activity" id="activity-title-2-1">Voyage</h3> <a href="#" class="btn btn-lite btn-red">High</a>
                          </div>
                          <div class="content-description">
                              <p class="task-name" id="task-name-2-1">Create the UI/UX design for the daily task project</p>
                              <div class="content-description-edit">
                                  <img src="./img/mynaui_pencil.svg" alt="edit pencil image" class="icon-edit">
                                  <img src="./img/ph_trash.svg" alt="delect trash can image" class="icon-edit">
                              </div>                            
                          </div>                        
                      </div>
                  </div>
              </div>  
          </content>`,
      document.getElementById("app"),
      "element-el",
      "content"
    );
  }
  renderFooter() {
    return this.createElement(
      "footer",
      `<footer>
              <div class="footer-left">
                <a href="https://github.com/chingu-voyages/v47-tier1-team-04">
                  <p class="copyright">© Chingu Team 04 Github</p>
                </a>
              </div>
              
              <a href="https://www.chingu.io" class="footer-right">          
                  <p class="copyright">Chingu</p>
                  <img class="chingu-logo" src="./img/chingo-logo.png"
                    />
              </a>            
            </footer> `,
      document.getElementById("app"),
      "element-el",
      "footer"
    );
  }
}

class App {
  constructor() {
    this.tasks = [];
    this.views = [];
    this.view = new View(
      "div",
      " <!--Code injected by Amanda-->",
      document.body,
      "app",
      "container"
    );
    this.controller = new Controller();
  }
  //Function to initialize app:
  async init(title) {
    await this.seed();
    this.controller.init(title);
    return this;
  }
  //Function to clear/reset tasks:
  resetState() {
    this.tasks = [];
    return this;
  }
  //Function to pull in the data from the data.model.json file:
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
}
const app = new App();
export default app;
//Object constructor to create new tasks:
export class Task {
  constructor(name, group, category, frequency, days, calander) {
    this.name = name;
    this.group = group;
    this.category = category;
    this.frequency = frequency;
    this.days = days;
    this.calander = calander;
    this.complete = false;
    app.tasks.push(this);
  }

  read() {
    this.complete = false;
    return this;
  }
  //Function to create new tasks:
  update(name, group, category, frequency, days, calander) {
    this.name = name;
    this.group = group;
    this.category = category;
    this.frequency = frequency;
    this.days = days;
    this.calander = calander;
    this.complete = false;
    return this;
  }
}

//Function to display the data into HTML:
let viewIndex = 1;

app.init("My Daily Classlist");
// setTimeout(() => console.log(app), 50)
// setTimeout(() => console.log(app.tasks[0].read()), 50)
//setTimeout(() => console.log(app.tasks[0].update('new','change','from','method','that')), 50)
// setTimeout(() => console.log(app.tasks.filter(task => task.group === "STUDYING")), 50)
// setTimeout(() =>   console.log([...new Set(app.tasks.map(task => task.group))]), 50)
const groups = () => [...new Set(app.tasks.map((task) => task.group))];
// setTimeout(() => groups().map(group => new View(group)), 50);
console.log(app);
