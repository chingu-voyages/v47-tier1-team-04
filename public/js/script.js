import Controller from "./controller.js";
//Function to display the data into HTML:
export class View {
  constructor(task) {
    this.task = task;
  }
  renderView() {
    const anchor = document.querySelector(".daily-checklist");
    const view = document.createElement("div");
    view.innerHTML = `
        <div class="activity">
           <h3>${this.task.group} <i class="fa-solid fa-circle-chevron-down"></i></h3>
           <ul id="activity-el">
       
           </ul>
       </div>
        `;
        anchor.append(view);
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
  
    app.init();
    // setTimeout(() => console.log(app), 50)
    // setTimeout(() => console.log(app.tasks[0].read()), 50)
    //setTimeout(() => console.log(app.tasks[0].update('new','change','from','method','that')), 50)
    // setTimeout(() => console.log(app.tasks.filter(task => task.group === "STUDYING")), 50)
  // setTimeout(() =>   console.log([...new Set(app.tasks.map(task => task.group))]), 50)
  const groups = () => [...new Set(app.tasks.map(task => task.group))]
   // setTimeout(() => groups().map(group => new View(group)), 50);
    console.log(app)
