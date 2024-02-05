import Controller from "./controller.js";
import { kebabCase } from "./utilities/utilities.js";
let viewIndex = 1;
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
    this.renderContentGroups();
    this.renderContentTasks();
    this.renderContentTasks();
    this.renderModalButton();
    this.renderFooter();
  }
  //Function to display the data into HTML:
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
    this.renderAside(title);
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
    this.createElement(
      "content",
      `<div class="content-search">
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
  

  `,
      document.getElementById("app"),
      "content",
      "content"
    );
    // Complete Project toggle
    const ellipses = document.querySelectorAll(".ellipse");

    ellipses.forEach(function (ellipse) {
      ellipse.addEventListener("click", function () {
        if (this.src.includes("Ellipse8.svg")) {
          this.src = "./img/favicon.png";
          this.style.width = "55px";
          this.style.height = "55px";
          this.parentElement.style.display = "flex";
          this.parentElement.style.justifyContent = "center";
          this.parentElement.style.alignItems = "center";
        } else {
          this.src = "./img/Ellipse8.svg";
        }

        const contentInner =
          this.closest(".content-main").querySelector(".content-inner");

        contentInner.classList.toggle("darken");
      });
    });
    
    // Complete task toggle
    // Add event listener to task names for marking as complete
    const taskNames = document.querySelectorAll(".task-name");

    taskNames.forEach(function(taskName) {
        taskName.addEventListener("click", function() {
            
            this.classList.toggle("complete");

            const checkboxIcon = this.closest('.content-description').querySelector('.checkbox');

            if (checkboxIcon.classList.contains('fa-square')) {
                checkboxIcon.classList.remove('fa-square');
                checkboxIcon.classList.add('fa-square-check');
            } else {
                checkboxIcon.classList.remove('fa-square-check');
                checkboxIcon.classList.add('fa-square');
            }
        });
    });
  }

  renderContentGroup(group) {
    this.createElement(
      "div",
      ` <h2 class="category-name">${group}</h2>`,
      document.getElementById("content"),
      `content_${kebabCase(group)}`,
      "content-activity"
    );
  }

  renderContentGroups() {
    console.log(app.controller.returnUniqueGroupNames());
    app.controller.returnUniqueGroupNames().map((group) => {
      app.view.renderContentGroup(group);
      app.controller
        .returnUniqueCategoriesByGroup(group)
        .map((category) => this.renderContentCategory(group, category));
    });
  }
  // createElement(element (what type of element is is ie div or footer): any, content (what is the inner html): any, anchor (what are we apending it to, where we are putting the element, it goes inside whatever we put here): any, id (optional, sets the id): any, classList (optional, sets the classlist): any): void

  renderContentTask(task) {
    const anchor = document.querySelector(
      `#category_${kebabCase(task.category)} .content-description`
    );
    this.createElement("p", task.name, anchor);
    this.createElement(
      "div",
      ` <img src="./img/mynaui_pencil.svg" alt="edit pencil image" class="icon-edit">
    <img src="./img/ph_trash.svg" alt="delect trash can image" class="icon-edit">`,
      anchor
    );
  }

  renderContentTasks() {
    app.tasks.map((task) => this.renderContentTask(task));
  }

  renderContentCategory(group, category) {
    this.createElement(
      "div",
      `
    <div class="content-main">
        <img src="./img/Ellipse8.svg" alt="ellipse checkbox" class="ellipse" id="ellipse-el">
        <div class="content-inner">
            <div class="content-task">
                <h3 class="activity">${category}</h3> <a href="#" class="btn btn-lite btn-blue">Low</a>
            </div>
            <div class="content-description">
            </div>         
        </div>

    </div>               
`,
      document.getElementById(`content_${kebabCase(group)}`),
      `category_${kebabCase(category)}`
    );
  }

  renderModalButton() {
    this.createElement(
      "div",
      '<i class="fa-solid fa-plus add-icon"></i>',
      document.getElementById("app"),
      "add-icon-el",
      "fa-solid fa-plus add-icon"
    );
    this.renderModal();
  }
  renderModal() {
    this.createElement(
      "div",
      `<!-- this is hidden until click event -->
    <div class="modal-top-nav">
      <i class="fa-solid fa-xmark fa-2x" id="modal-close-el"></i>
      <h2>Task Details</h2> 
      <a href="#" class="btn modal-btn-save">Save</a>
    </div>

    <div class="task-category">
      <div class="modal-task">
        <label for="task-name">Task Name</label><br>
        <input type="text" id="task-name" name="task-name" placeholder="Projects...">
      </div>
      <div class="modal-category">
        <label for="category-name">Category Name</label><br>
        <select name="categpory-name" id="category-name">
          <option value="routine">Routine Activites</option>
          <option value="studying">Studying</option>
          <option value="daily">Daily Task Project</option>
          <option value="chingu">Chingu</option>
        </select>
      </div>
    </div>

    <div class="modal-description">
        <label for="description-name">Description</label><br>
        <input type="text" id="description-name" name="description-name" size="50">
    </div>
    <div class="modal-subtask">
          <input type="checkbox" id="modal-subtask" name="modal-subtask" value="subtask">
          <input type="text" id="modal-subtask" name="modal-subtask" placeholder="Add subtask...">
    </div>

    <div class="modal-date-time">
      <div class="datepicker-spinbuttons modal-date" role="group" aria-labelledby="datepickerLabel datepickerDate">  
        <div id="datepickerLabel">Date</div>      
        <div class="dateinfo">
            <div class="date" id="datepickerDate"></div>
            <div class="day spinbutton">
                <div class="previous" aria-hidden="true">30</div>
                <div role="spinbutton" aria-valuenow="1" aria-valuetext="first" aria-valuemin="1" aria-valuemax="31" aria-label="Day">1</div>
                <div class="next" aria-hidden="true">2</div>
            </div>    
            <div class="month spinbutton">
                <div class="previous" aria-hidden="true">May</div>
                <div role="spinbutton" aria-valuenow="5" aria-valuetext="June" aria-valuemin="0" aria-valuemax="11" aria-label="Month">June</div>
                <div class="next" aria-hidden="true">July</div>
            </div>    
            <div class="year spinbutton">
                <div class="previous" aria-hidden="true">2018</div>
                <div role="spinbutton" aria-valuenow="2019" aria-valuemin="2019" aria-valuemax="2040" aria-label="Year">2019</div>
                <div class="next" aria-hidden="true">2020</div>
            </div>
        </div>
      </div>
    
      <div class="time modal-time">
        <div class="timepicker-spinbuttons" role="group" aria-labelledby="timepickerLabel timepickerDate">
            <div id="timepickerLabel">Time</div>
            <div class="time" id="timepickerDate"></div>
    
            <div class="hour spinbutton">
                <div class="previous" aria-hidden="true">11</div>
                <div role="spinbutton" aria-valuenow="1" aria-valuetext="first" aria-valuemin="1" aria-valuemax="12" aria-label="Hour">12</div>
                <div class="next" aria-hidden="true">1</div>
            </div>
    
            <div class="minute spinbutton">
                <div class="previous" aria-hidden="true">59</div>
                <div role="spinbutton" aria-valuenow="0" aria-valuetext="00" aria-valuemin="0" aria-valuemax="59" aria-label="Minute">00</div>
                <div class="next" aria-hidden="true">01</div>
            </div>
    
            <div class="ampm spinbutton">
                <div class="previous" aria-hidden="true">AM</div>
                <div role="spinbutton" aria-valuenow="AM" aria-valuetext="AM" aria-valuemin="AM" aria-valuemax="PM" aria-label="AM">AM</div>
                <div class="next" aria-hidden="true">PM</div>
            </div>
        </div>
      </div>
  </div>

    <div class="modal-priority">
      <label for="priority-level">Priority-level</label>
        <select name="priority-level" id="priority-level">
          <option value="low">Low</option>
          <option value="med">Med</option>
          <option value="high">High</option>                    
        </select>
    </div>

    <textarea name="notes" id="notes" class="notes" placeholder="Notes..."></textarea>
   <!-- end of modal -->
  <!-- https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/examples/datepicker-spinbuttons/ -->`,
      document.getElementById("app"),
      null,
      "modal"
    );
    //Function to display the data into HTML:
    let viewIndex = 1;

    // Modal pop-up
    const addIconEl = document.getElementById("add-icon-el");
    const modal = document.querySelector(".modal");
    const modalClose = document.getElementById("modal-close-el");

    addIconEl.addEventListener("click", function () {
      console.log("we have lift off");
      modal.style.display = "block";
    });

    modalClose.addEventListener("click", function () {
      modal.style.display = "none";
    });

    // Details popup window
    const detailsPopup = document.querySelector('.task-details-popup');
    const openDetailsButtons = document.querySelectorAll('.fa-circle-info.detail');
    const closeDetailsButton = document.querySelector('.close-details-popup');

    openDetailsButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            detailsPopup.style.display = 'block';
        });
    });

    closeDetailsButton.addEventListener('click', function() {
        detailsPopup.style.display = 'none';
    });

    // Automatically populate details with task name and category from html
    // Get the task name and category name elements
const taskNameElement = document.getElementById('task-name-1-1');
const categoryNameElement = document.getElementById('category-name-1');

// Get the input fields in the details popup
const taskNameInput = document.getElementById('task-name-input');
const categoryNameInput = document.getElementById('category-name-input');

// Set the initial values of the input fields
taskNameInput.value = taskNameElement.textContent;
categoryNameInput.value = categoryNameElement.textContent;

  }
  renderFooter() {
    this.createElement(
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
    // Hamburger Menu Display on Mobile

    const menuBtn = document.querySelector(".menu-btn");
    const asideEl = document.getElementById("aside-el");

    menuBtn.addEventListener("click", function () {
      asideEl.style.display =
        asideEl.style.display === "none" || asideEl.style.display === ""
          ? "block"
          : "none";
    });
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

// setTimeout(() => console.log(app), 50)
// setTimeout(() => console.log(app.tasks[0].read()), 50)
//setTimeout(() => console.log(app.tasks[0].update('new','change','from','method','that')), 50)
// setTimeout(() => console.log(app.tasks.filter(task => task.group === "STUDYING")), 50)
// setTimeout(() =>   console.log([...new Set(app.tasks.map(task => task.group))]), 50)
// const groups = () => [...new Set(app.tasks.map((task) => task.group))];

// console.log(app.tasks);
(async () => {
  await app.init("My Daily Classlist");
  // console.log(app.tasks)
})(); // make the console log asyncrinus and to be seen when I inspect the page
