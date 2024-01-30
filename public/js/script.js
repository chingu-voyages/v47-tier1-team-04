(Function () {
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
    }
    const app = new App();
  
    // Object constructor to create new tasks:
    class Task {
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
      // Method to update a task:
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
  
    // Method to display the data into HTML:
    class View {
      constructor(task) {
        this.task = task;
      }
      renderView() {
        const anchor = document.getElementById("daily-checklist");
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
  
    app.init();
    // setTimeout(() => console.log(app), 50)
    // setTimeout(() => console.log(app.tasks[0].read()), 50)
    //setTimeout(() => console.log(app.tasks[0].update('new','change','from','method','that')), 50)
    // setTimeout(() => console.log(app.tasks.filter(task => task.group === "STUDYING")), 50)
  // setTimeout(() =>   console.log([...new Set(app.tasks.map(task => task.group))]), 50)
  const groups = () => [...new Set(app.tasks.map(task => task.group))]
    setTimeout(() => groups().map(group => new View(group)), 50);
    console.log(groups())
  })();
