import renderAsideGroups, { updateAsideGroups } from "./renderAside/renderAsideGroups.js";
import renderNavBar from "./renderNavbar.js";
import renderContent, { updateContent } from "./content/renderContent.js";
import { removePopup } from "./modals/view-task.js";
import renderFooter from "./renderFooter.js";
import { renderModalButton } from "./modals/add-edit-task.js";

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
    renderFooter();
    renderModalButton();
  }
  // createElement(element (what type of element is is ie div or footer): any, content (what is the inner html): any, anchor (what are we apending it to, where we are putting the element, it goes inside whatever we put here): any, id (optional, sets the id): any, classList (optional, sets the classlist): any): void
  //Function to display the data into HTML:
  createElement(element, content, anchor, id, classList) {
    return new View(element, content, anchor, id, classList);
  }
  updateView(){
    removePopup();
    updateAsideGroups();
    updateContent();
    if (app.tasks.length > 0) {
    if (document.getElementById("search").classList.includes("active")) return 
    else document.getElementById("search").value = "";
  }
  }
  toggleCategory(group, category){
    //console.log(group,category, app.controller.returnCategoryByGroup(group).map(task => task.toggleComplete()));
  }
  
}

// Hamburger Menu Display on Mobile < Emmetts code for hamburger menu

