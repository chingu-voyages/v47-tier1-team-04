import Controller from "../controller/controller.js";
import View from "../view/view.js";

// declares a Model, for our app to be built from. This is not a true constructor as we will only use this once to create one instance of this object, the "app"
export class Model {
  constructor() {
    this.controller = new Controller(); // creates a controller object on the app
    this.view = new View("div", ``, document.body, "app", "container"); // initializes a new view, appending it to the document.body as on the view property of the application
    this.tasks = []; // declares empty array to store tasks in
    this.views = []; // declares empty array to store views in
  }
  // Method to initialize app
  async init(title) {
    this.controller.resetState(); // calls controller.resetState to clear out tasks
    await this.controller.seed(); // awaits json fetch / seed of db
    this.controller.init(title); // calls the controller.init function, passing in the title given within app.js
    return this;
  }
}
// declares app app as a new instance of this new class
const app = new Model();
export default app;
