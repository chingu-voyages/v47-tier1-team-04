import app from "../app.js";
import { kebabCase } from "../utilities/utilities.js";
import renderTaskDetailsPopup from "./modals/add-edit-task.js";
import renderViewTaskDetailsPopup from "./modals/view-task.js";

export default class TaskViewController {
  clearTasks() {
    app.view.contentViewController.anchor().innerHTML = "";
  }
  clearTask(task) {
    task.view.innerHTML = "";
  }
  updateTasks(tasks) {
    console.log(tasks);
    app.tasks.map((task) => task.view.update(content));
  }
  updateTask(task) {
    this.clearTask(task);
    this.renderContentTask(task);
  }
  addTask(task) {
    if (!document.querySelector(`#content_${kebabCase(task.group)}`)) {
      app.view.contentViewController.clearContentGroup(task.group);
      app.view.contentViewController.renderContentGroup(task.group);
    }

    if (!document.querySelector(`#category_${kebabCase(task.category)}`)) {
      app.view.appViewController.updateApp();
    } else {
      this.renderContentTask(task);
    }
  }
  renderTaskDetails = (task, anchor) => {
    console.log(task, anchor);
    const taskContainer = app.view.createElement(
      "p",
      `<i class="fa-regular fa-square checkbox"></i> ${task.name}`,
      anchor,
      null,
      "task-name"
    );
    task.view = anchor;
    taskContainer.container.onclick = () => {
      task.toggleComplete();
      taskContainer.container.classList.toggle("complete");
      const taskCheckbox = document.querySelector(`#${taskContainer.id} i`);
      if (taskCheckbox.classList.contains("fa-square")) {
        taskCheckbox.classList.remove("fa-square");
        taskCheckbox.classList.add("fa-square-check");
      } else {
        taskCheckbox.classList.remove("fa-square-check");
        taskCheckbox.classList.add("fa-square");
      }
    };
    // Complete Project toggle
    const ellipses = document.querySelectorAll(".ellipse");

    ellipses.forEach(function (ellipse) {
      ellipse.addEventListener("click", function () {
        if (this.src.includes("Ellipse8.svg")) {
          this.src = "./img/favicon.png";
          this.style.width = "55px";
          this.style.height = "55px";
          this.parentElement.style.display = "flex";
          this.parentElement.style.justifyContent = "center";
          this.parentElement.style.alignItems = "center";
        } else {
          this.src = "./img/Ellipse8.svg";
        }

        const contentInner =
          this.closest(".content-main").querySelector(".content-inner");

        contentInner.classList.toggle("darken");
      });
    });
    this.renderTaskOptionsDiv(task, anchor);
    if (task.complete) {
      taskContainer.container.classList.toggle("complete");
      const taskCheckbox = document.querySelector(`#${taskContainer.id} i`);
      taskCheckbox.classList.remove("fa-square");
      taskCheckbox.classList.add("fa-square-check");
    }
  };
  renderTaskOptionsDiv = (task, anchor) => {
    app.view.createElement(
      "div",
      `<i class="fa fa-circle task-priority-${
        task.priority
      }" aria-hidden="true"></i>
          <i class="fa-solid fa-circle-info fa-2x detail" id="view_${kebabCase(
            task.name
          )}"></i>
          <img src="./img/mynaui_pencil.svg" alt="edit pencil image" class="icon-update" id="edit_${kebabCase(
            task.name
          )}">
          <img src="./img/ph_trash.svg" alt="delect trash can image" class="icon-edit" id="task_remove_${kebabCase(
            task.name
          )}">`,
      anchor,
      `task_options_${kebabCase(task.name)}`,
      "task-icons"
    );
    document.getElementById(`view_${kebabCase(task.name)}`).onclick = () => {
      renderViewTaskDetailsPopup(task);
    };

    if (
      document.querySelector(
        `#task_options_${kebabCase(task.name)} i.fa-circle`
      )
    )
      document.querySelector(
        `#task_options_${kebabCase(task.name)} i.fa-circle`
      ).onclick = () => app.controller.cyclePriority(task);

    document.getElementById(`edit_${kebabCase(task.name)}`).onclick = () =>
      renderTaskDetailsPopup(task);

    document.getElementById(`task_remove_${kebabCase(task.name)}`).onclick =
      () => app.controller.removeTask(task);
  };
  renderContentTask = (task) => {
    const anchor = app.view.createElement(
      "div",
      ``,
      document.querySelector(
        `#category_${kebabCase(task.category)} .content-inner`
      ),
      `task_${kebabCase(task.name)}`,
      "content-description"
    ).container;

    this.renderTaskDetails(task, anchor);
  };
  renderContentTasks = (filter = app.tasks) => {
    filter.map((task) => this.renderContentTask(task));
  };
  updateTask = (task) => {
    this.clearTask(task);
    this.renderTaskDetails(task, task.view);
  };
  removeTask = (task) => {
    task.view.remove();

    if (
      document.querySelectorAll(
        `#category_${kebabCase(
          task.category
        )} .content-inner .content-description`
      ).length < 2
    ) {
      document.querySelector(`#category_${kebabCase(task.category)}`).remove();
    }
    if (
      document.querySelector(`#content_${kebabCase(task.group)}`)
        .childElementCount < 2
    ) {
      document.querySelector(`#content_${kebabCase(task.group)}`).remove();
    }
  };
}