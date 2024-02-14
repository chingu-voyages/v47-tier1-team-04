import Controller from "./controller.js";
import View from './views/view.index.js';

class Model {
  constructor() {
    this.tasks = []; //Creates an empty tasks array
    this.archive = [];//Creates an empty archive
    this.view = new View(
      "div",
      "<!--Code injected by Amanda Team 4-->",
      document.body,
      "app",
      "container"
    ); //Allows us to put the app onto the screen by using above parameters and gives us access to app.view.method()
    this.controller = new Controller();//Allows us to access the Controller by adding it here, don't have to import on each page
  }
  //Function to initialize app:
  async init(title) {
    await this.controller.loadData();//Line runs process to check for localStorage and then makes tasks array from that or seed data
    this.controller.init(title);//
    return this;
  }
}
const app = new Model(); //Creating a new data model and naming it 'app'
export default app;

