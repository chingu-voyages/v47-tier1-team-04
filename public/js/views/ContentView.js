import app from "../app.js";
import { kebabCase } from "../utilities/utilities.js";

export default class ContentViewController {
  clearContent() {
    document.getElementById("content").innerHTML = "";
  }
  init() {
    app.view.createElement(
      "content",
      "",
      document.getElementById("contentAnchor"),
      "content",
      "content"
    );
    this.renderContent();
  }
  renderContent() {
    this.renderContentGroups();
    app.view.taskViewController.renderContentTasks();
  }
  updateContentTasks(filter) {
    this.clearContent();
    if (filter) {
      let temp = app.tasks;
      app.tasks = filter;
      this.renderContent();
      app.tasks = temp;
    } else this.renderContent();
  }
//   clearContentGroup(group) {
//     document.getElementById(`content_${kebabCase(group)}`).innerHTML = "";
//   }

  updateContentGroup(group) {
    this.clearContentGroup(group);
    this.renderContentGroup(group);
    app.controller
      .returnUniqueCategoriesByGroup(group)
      .map((category) => this.renderContentCategory(group, category));
  }
  renderContentGroup(group) {
    app.view.createElement(
      "div",
      `<h2 class="category-name">${group}</h2>`,
      document.getElementById("content"),
      `content_${kebabCase(group)}`,
      "content-activity"
    );
  }
  renderContentGroups() {
    app.controller.returnUniqueGroupNames().map((group) => {
      this.renderContentGroup(group);
      app.controller
        .returnUniqueCategoriesByGroup(group)
        .map((category) => this.renderContentCategory(group, category));
    });
  }
  clearContentCategory(category) {
    document.getElementById(`category_${kebabCase(category)}`).innerHTML = "";
  }
  updateContentCategory(group, category) {
    this.clearContentCategory(category);
    this.renderContentCategory(group, category);    
  }
  renderContentCategory(group, category) {
    app.view.createElement(
      "div",
      `
      <div class="content-main">
          <img src="./img/Ellipse8.svg" alt="ellipse checkbox" class="ellipse" id="ellipse_${kebabCase(
            group
          )}_${kebabCase(category)}">
          <div class="content-inner">
              <div class="content-task">
                  <h3 class="activity">${category}</h3> 
  
                  <i class="fa-solid fa-plus add-task"></i>
  
              </div>
              <div class="content-description">
                                        
              </div>                        
          </div>
  
      </div>               
  `,
      document.getElementById(`content_${kebabCase(group)}`),
      `category_${kebabCase(category)}`
    );

    document.querySelectorAll(".add-task").forEach((ele) => {
      ele.onclick = (e) => {
        ele.style.display = "none";
        const category = e.target.previousElementSibling.innerHTML;
        const group =
          e.target.parentElement.parentElement.parentElement.parentElement
            .parentElement.firstChild.innerHTML;
        const inputElement = document.createElement("input");
        inputElement.placeholder = "enter quick task here";
        inputElement.setAttribute("type", "text");
        inputElement.setAttribute("class", "add-task-input");
        ele.parentElement.appendChild(inputElement);
        inputElement.addEventListener("keypress", function (event) {
          if (event.key === "Enter") {
            const task = {
              name: inputElement.value,
              group: group,
              category: category,
              days: new Array(),
              description: "",
              priority: 3
            };
            app.controller.addTask(task);
            inputElement.style.display = "none";
            ele.style.display = "inline";
            this.updateContentCategory(task.group, task.category);
          }
        });
      };
    });
  }
}
