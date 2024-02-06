import app from '../app.js';
import renderAsideGroups from './renderAside/renderAsideGroups.js'
import renderNavBar from './renderNavbar.js';
import { renderContent, renderContentGroups, renderContentTasks, renderModalButton, renderFooter, renderTaskDetailsPopup} from './everythingElse.temp.js';
let viewIndex = 1;
export default class View {
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
    renderAsideGroups(title);
    renderNavBar();
    renderContent();
    renderContentGroups();
    renderContentTasks();
    renderModalButton();
    renderFooter();
    renderTaskDetailsPopup(app.tasks[0]);
  }
  //Function to display the data into HTML:
  createElement(element, content, anchor, id, classList) {
    const newView = new View(element, content, anchor, id, classList);
    app.views.push(newView);
    return newView;
  }
}