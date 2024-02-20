import Controller from "./Controller.js";
import View from "./views/View.index.js";

class Model {
  constructor() {
    this.state = {
      darkMode: false,
      title: "Daily Tasks",
      lastModified: new Date().toLocaleString(),
    }; //Creates an empty state object
    this.tasks = []; //Creates an empty tasks array
    this.archive = []; //Creates an empty archive
    this.view = new View(
      "div",
      "<!--Code injected by Amanda Team 4-->",
      document.body,
      "app",
      "container"
    ); //Allows us to put the app onto the screen by using above parameters and gives us access to app.view.method()
    this.controller = new Controller(); //Allows us to access the Controller by adding it here, don't have to import on each page
  }
  //Function to initialize app:
  async init(title) {
    await this.controller.loadData(); //Line runs process to check for localStorage and then makes tasks array from that or seed data
    this.controller.init(title); //
    return this;
  }
}
const app = new Model(); //Creating a new data model and naming it 'app'
export default app;//This line exports the app object to be used in other files

app.init("Chingu Task Tracker"); // This line initializes the app
//Value of 'Chingu Task Tracker' passes title into app, default is 'Daily Checklist'
console.log(app); //Provides user with app level information inside of the console
//Should remove console.log before going live

// Everything in JavaScript is an object.
// defining anything and everything itself is an object
// in the global space we are always defining a property on the global object, which is a copy of the window object
// try creating a variable in the global space and then type window. and you will see the variable you just created
// window is the global object in the browser. Therefore we can access the window object by typing window. or just the variable name

// By creating a new object, we are creating a new instance of the object and since we created a constructor for a Model, we can create our own version of this same namespace
// Only in our namespace, app will only contain the tasks and archive properties, and the view and controller methods

// Since the view and controller are methods, we can access them by typing app.view or app.controller
// And since they are new instance of the view and controller, we can access the methods on them by typing app.view.method() or app.controller.method()

// By utilizing the constructor, we can create a single instance of the Model and have access to the view and controller methods and properties by importing the app object into any file we want to use it in
// This is a way to create a single source of truth for our application and to keep our code DRY

// This way we dont have to keep track of a bunch of const and let variables and we can keep everything in one place and access it from anywhere in our application