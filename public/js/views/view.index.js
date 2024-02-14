import renderAsideGroups, { updateAsideGroups } from "./renderAside/renderAsideGroups.js";
import renderNavBar from "./renderNavbar.js";
import renderContent, { updateContent } from "./content/renderContent.js";
import { removePopup } from "./modals/view-task.js";
import renderFooter from "./renderFooter.js";
import { renderModalButton } from "./modals/add-edit-task.js";

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
    anchor.append(container);//Where we are appending the container too
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
  updateView(filteredTasks){
    let temp = app.tasks;
    if (filteredTasks) app.tasks = filteredTasks;
    removePopup();
    updateAsideGroups();
    updateContent();
    app.tasks = temp;
    if (app.tasks && app.tasks.length > 0) {
    if (document.getElementById("search").classList.includes("active")) return 
    else document.getElementById("search").value = "";
  }
  }
  toggleCategory(group, category){
    //console.log(group,category, app.controller.returnCategoryByGroup(group).map(task => task.toggleComplete()));
  }
  
}

// Hamburger Menu Display on Mobile < Emmetts code for hamburger menu

