(function () {
    
    class View { // What the app looks like, what the user can see and do, User Interface
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
        init() {
            this.renderAside("My Daily Checklist");
        }
        createElement(element, content, anchor, id, classList) {
            const newView = new View(element, content, anchor, id, classList);
            app.views.push(newView);
        }
        renderAside(title) {
            return this.createElement("aside", ` <div class="avatar-area">
            <div class="avatar">
                <img src="./img/Friendly Ones Avatar and Backdrop.png" alt="avatar pict">
            </div>
            <div class="gear-icon">
                <img src="./img/solar_settings-linear.svg" alt="gear icon">
            </div>
        </div>            

        <h2>${title}</h2>
            <div class="daily-checklist">
                <div class="activity">
                    <h3 id="category-title-1">Routine Activities <i class="fa-solid fa-circle-chevron-down"></i></h3>
                    <ul id="activity-el">
                        <li id="task-1-1">Projects</li>
                        <li id="task-1-2">Blog Posts</li>
                    </ul>
                </div>

                <div class="activity">
                    <h3 id="category-title-2">Studying <i class="fa-solid fa-circle-chevron-down"></i></h3>
                    <ul>
                        <li id="task-2-1">Mongo DB</li>
                        <li id="task-2-2">Blog Posts</li> 
                    </ul>
                </div>
                
                <div class="activity">
                    <h3 id="category-title-3">Daily Task Project <i class="fa-solid fa-circle-chevron-down"></i></h3>
                    <ul>
                        <li id="task-3-1">Backlog</li>
                        <li id="task-3-2">Coding</li>
                    </ul>
                </div>

                <div class="activity">
                    <h3 id="category-title-4">Chingu <i class="fa-solid fa-circle-chevron-down"></i></h3>
                    <ul>
                        <li id="task-4-1">Voyage</li>
                        <li id="task-4-2">Pair Programming</li>
                        <li id="task-4-3">Physical Exercise</li>
                    </ul>
                </div>
            </div>`, document.getElementById("app"), "element-el", "aside")
        }
    }
    
    class App {
      constructor() {
        this.tasks = [];
        this.views = [];
        this.view = new View("div", " <!--Code injected by Amanda-->", document.body, "app", "container")
      }
      //Function to initialize app:
      init() {
        this.seed();
        this.view.init();
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
  
    //Object constructor to create new tasks:
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

   
  
    app.init();
    // setTimeout(() => console.log(app), 50)
    // setTimeout(() => console.log(app.tasks[0].read()), 50)
    //setTimeout(() => console.log(app.tasks[0].update('new','change','from','method','that')), 50)
    // setTimeout(() => console.log(app.tasks.filter(task => task.group === "STUDYING")), 50)
  // setTimeout(() =>   console.log([...new Set(app.tasks.map(task => task.group))]), 50)
  const groups = () => [...new Set(app.tasks.map(task => task.group))]
   // setTimeout(() => groups().map(group => new View(group)), 50);
    console.log(app)
  })();
