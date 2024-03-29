import app from "../app.js";

export default class ContentViewController {
  // Clears the content of the element with id 'content'
  clearContent() {
    document.getElementById("content").innerHTML = "";
  }

  // Initializes the content view by creating an element and rendering the content
  init() {
    this.createElement("content", "", "contentAnchor", "content", `content`);
    this.renderContent();
  }

  // Renders the content by rendering content groups and tasks
  renderContent() {
    this.renderContentGroups();
    app.view.taskViewController.renderContentTasks();
  }

  // Updates the content tasks based on the provided filter
  updateContentTasks(filter) {
    this.clearContent();
    if (filter) {
      let temp = app.tasks;
      app.tasks = filter;
      this.renderContent();
      app.tasks = temp;
    } else this.renderContent();
  }

  // Clears the content of a specific group
  clearContentGroup(group) {
    const groupElement = document.getElementById(
      `content_${this.formatString(group)}`
    );
    if (groupElement) groupElement.innerHTML = "";
    else this.clearContent();
  }

  // Updates the content of a specific group
  updateContentGroup(group) {
    this.clearContentGroup(group);
    this.renderContentGroup(group);
    this.renderCategories(group);
  }

  // Renders a specific content group
  renderContentGroup(group) {
    this.createElement(
      "div",
      `<h2 class="group-name">${group} <i id="content_group_chevron_${app.controller.formatString(
        group
      )}" class="fa-solid" ></i> <i class="fa fa-solid fa-edit"></i></h2>`,
      "content",
      `content_${this.formatString(group)}`,
      "content-activity"
    );
  }

  // Renders all content groups
  renderContentGroups() {
    app.controller.returnUniqueGroupNames().map((group) => {
      this.renderContentGroup(group);
      this.renderCategories(group);
    });
  }

  // Clears the content of a specific category
  clearContentCategory(category) {
    document.getElementById(
      `category_${this.formatString(category)} .content-inner`
    ).innerHTML = "";
  }

  // Updates the content of a specific category
  updateContentCategory(group, category) {
    this.clearContentCategory(category);
    this.renderContentCategory(group, category);
  }

  // Renders a specific content category
  renderContentCategory(group, category) {
    const catTasks = app.tasks.filter((task) => task.category === category);
    const completeCategory =
      catTasks.filter((task) => task.complete).length === catTasks.length;
    this.createElement(
      "div",
      this.createContentMainHTML(group, category, completeCategory),
      `content_${this.formatString(group)}`,
      `category_${this.formatString(category)}`
    );
    this.addTaskEventListeners();
    this.addCategoryEventListeners();
    this.addGroupEventListeners();
  }

  // Creates an HTML element with the specified parameters
  createElement(tag, innerHTML, parentId, id, className) {
    app.view.createElement(
      tag,
      innerHTML,
      document.getElementById(parentId),
      id,
      className
    );
  }

  // Formats a string by calling the formatString method of the controller
  formatString(string) {
    return app.controller.formatString(string);
  }

  // Renders all categories of a specific group
  renderCategories(group) {
    app.controller
      .returnUniqueCategoriesByGroup(group)
      .map((category) => this.renderContentCategory(group, category));
  }

  // Creates the main HTML content for a specific group and category
  createContentMainHTML(group, category, completeCategory) {
    return `
      <div class="content-main">
          <img src="${
            completeCategory ? `./img/favicon.png` : `./img/Ellipse8.svg`
          }" alt="ellipse checkbox" class="ellipse" id="ellipse_${this.formatString(
      group
    )}_${this.formatString(category)}">
          <div class="content-inner ${completeCategory ? `darken` : ""}" id="">
              <div class="content-task">
                  <h3 class="activity">${category}</h3><i class="fa-solid fa-pencil"></i>
                  <i class="fa-solid fa-plus add-task"></i>
              </div>
              <div class="content-description"></div>                        
          </div>
      </div>               
    `;
  }
  addGroupEventListeners() {
    document.querySelectorAll(".fa-edit").forEach((ele) => {
      const oldGroup = ele.parentElement.innerHTML;
      ele.onclick = (e) => {
        e.target.parentElement.contentEditable = "true";
        e.target.parentElement.focus();
        e.target.parentElement.onkeypress = (e) => {
          if (e.key === "Enter") {
            e.target.contentEditable = "false";
            const newGroup = e.target.innerHTML;
            app.controller.updateGroup(oldGroup,newGroup);
            app.view.asideViewController.updateAsideGroupWithoutReRender(
              oldGroup,newGroup
            );
          }
        };
      }
    });
    document.querySelectorAll(".group-name").forEach((ele) => {
      ele.onclick = (e) => {
        for (let contentInner of e.target.parentElement.children) {
          if (contentInner.classList.contains("group-name")) {
            const icon = contentInner.querySelector("i");
            //icon.classList.toggle("fa-circle-chevron-down");
          } else {
            contentInner.classList.toggle("hide");
          }
        }
      };
    });
  }
  addCategoryEventListeners() {
    document.querySelectorAll("h3.activity").forEach((ele) => {
      const oldCategory = ele.innerHTML;
      ele.nextElementSibling.onclick = (e) => {
        e.target.previousElementSibling.contentEditable = "true";
        e.target.previousElementSibling.focus();
        e.target.previousElementSibling.onkeypress = (e) => {
          if (e.key === "Enter") {
            e.target.contentEditable = "false";
            const newCategory = e.target.innerHTML;
            console.log(
              e.target.parentElement.parentElement.parentElement.parentElement
            );
            e.target.parentElement.parentElement.parentElement.parentElement.id = `category_${app.controller.formatString(
              newCategory
            )}`;
            console.log(oldCategory, newCategory);
            app.controller.updateCategory(oldCategory, newCategory);
            app.view.asideViewController.updateAsideCategoryWithoutReRender(
              oldCategory,
              newCategory
            );
          }
        };
      };
    });
  }
  // Adds event listeners to all elements with the class 'add-task'
  addTaskEventListeners() {
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
