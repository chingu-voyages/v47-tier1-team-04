import app from "../app.js";

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
  clearContentGroup(group) {
    const groupElement = document.getElementById(
      `content_${app.controller.formatString(group)}`
    );
    if (groupElement) groupElement.innerHTML = "";
    else document.getElementById(`content`).innerHTML = "";
  }
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
      `content_${app.controller.formatString(group)}`,
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
    document.getElementById(
      `category_${app.controller.formatString(category)} .content-inner`
    ).innerHTML = "";
  }
  updateContentCategory(group, category) {
    this.clearContentCategory(category);
    this.renderContentCategory(group, category);
  }
  renderContentCategory(group, category) {
    const catTasks = app.tasks.filter((task) => task.category === category);
    const completeCategory =
      catTasks.filter((task) => task.complete).length === catTasks.length;
    app.view.createElement(
      "div",
      `
      <div class="content-main">
          <img src="${
            completeCategory ? `./img/favicon.png` : `./img/Ellipse8.svg`
          }" alt="ellipse checkbox" class="ellipse" id="ellipse_${app.controller.formatString(
        group
      )}_${app.controller.formatString(category)}">
          <div class="content-inner ${completeCategory ? `darken` : ""}" id="">
              <div class="content-task">
                  <h3 class="activity">${category}</h3> 
  
                  <i class="fa-solid fa-plus add-task"></i>
  
              </div>
              <div class="content-description">
                                        
              </div>                        
          </div>
  
      </div>               
  `,
      document.getElementById(`content_${app.controller.formatString(group)}`),
      `category_${app.controller.formatString(category)}`
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
              group,
              category,
              days: new Array(),
              description: "",
              priority: 3,
            };
            app.controller.addTask(task);
            inputElement.style.display = "none";
            ele.style.display = "inline";
          }
        });
      };
    });
  }
}
