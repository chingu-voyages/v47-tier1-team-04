import AppViewController from "./AppView.js";
import AsideViewController from "./AsideView.js";
import ContentViewController from "./ContentView.js";
import TaskViewController from "./TaskView.js";

let viewIndex = 1;
export default class View {
  // Constructor object that creates new 'views'
  constructor(element, content, anchor, id, classList) {
    const container = document.createElement(element); //Creating an empty html tag of whatever element is equal too
    container.innerHTML = content; //Defines the html container we just created
    if (id) {
      container.id = id;
      this.id = id;
    } else {
      container.id = `view_${viewIndex}`; //If there isn't an 'id', we will dynamically create one
      this.id = container.id;
      viewIndex++; //This increments the id so we always end up with new one
    }
    if (classList) {
      container.classList = classList;
    }
    anchor.append(container);//Where we are appending the container to
    this.container = container;//Stores container on obj so we can access later
  }
  init(title) {
    renderAsideGroups(title);
    renderNavBar();
    renderContent();
    renderFooter();
    renderModalButton();
  }
  // createElement(element (what type of element is is ie div or footer): any, content (what is the inner html): any, anchor (what are we apending it to, where we are putting the element, it goes inside whatever we put here): any, id (optional, sets the id): any, classList (optional, sets the classlist): any): void
  //Function to display the data into HTML:
  createElement(element, content, anchor, id, classList) {
    return new View(element, content, anchor, id, classList);
  }
  update(content) {
    this.container.innerHTML = content; // method allowing us to change the inner html of the View's container
  }
  appViewController = new AppViewController();
  asideViewController = new AsideViewController();
  contentViewController = new ContentViewController();
  taskViewController = new TaskViewController();
}
// This is the View object that is being exported to the app.js file. It is being used to create new views and update the content of the view's container. It also has properties that are instances of the other view objects.
