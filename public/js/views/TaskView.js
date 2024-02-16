import app from "../app.js";
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
    app.tasks.map((task) => task.view.update(content));
  }
  updateTask(task) {
    this.clearTask(task);
    this.renderContentTask(task);
  }
  addTask(task) {
    if (
      task.group &&
      !document.querySelector(
        `#content_${app.controller.formatString(task.group)}`
      )
    ) {
      app.view.contentViewController.clearContentGroup(task.group);
      app.view.contentViewController.renderContentGroup(task.group);
    }

    if (
      !document.querySelector(
        `#category_${app.controller.formatString(task.category)}`
      )
    ) {
      app.view.appViewController.updateApp();
    } else {
      this.renderContentTask(task);
    }
  }
  renderTaskDetails = (task, anchor) => {
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
    const ellipse = document.querySelector(
      `#ellipse_${app.controller.formatString(
        task.group
      )}_${app.controller.formatString(task.category)}`
    );
    ellipse.onclick = () => {
      if (ellipse.src.includes("Ellipse8.svg")) {
        ellipse.src = "./img/favicon.png";
        app.tasks
        .filter((taskFilter) => taskFilter.category === task.category)
        .map((filteredTask) => {
          filteredTask.setComplete();
          this.updateTask(filteredTask);
        });
      } else {
        ellipse.src = "./img/Ellipse8.svg";
        app.tasks
        .filter((taskFilter) => taskFilter.category === task.category)
        .map((filteredTask) => {
          filteredTask.setIncomplete();
          this.updateTask(filteredTask);
        });
      }

      const contentInner = ellipse
        .closest(".content-main")
        .querySelector(".content-inner");

      contentInner.classList.toggle("darken");
      
    };
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
          <i class="fa-solid fa-circle-info fa-2x detail" id="view_${app.controller.formatString(
            task.name
          )}"></i>
          <img src="./img/mynaui_pencil.svg" alt="edit pencil image" class="icon-update" id="edit_${app.controller.formatString(
            task.name
          )}">
          <img src="./img/ph_trash.svg" alt="delect trash can image" class="icon-edit" id="task_remove_${app.controller.formatString(
            task.name
          )}">`,
      anchor,
      `task_options_${app.controller.formatString(task.name)}`,
      "task-icons"
    );
    document.getElementById(
      `view_${app.controller.formatString(task.name)}`
    ).onclick = () => {
      renderViewTaskDetailsPopup(task);
    };

    if (
      document.querySelector(
        `#task_options_${app.controller.formatString(task.name)} i.fa-circle`
      )
    )
      document.querySelector(
        `#task_options_${app.controller.formatString(task.name)} i.fa-circle`
      ).onclick = () => app.controller.cyclePriority(task);

    document.getElementById(
      `edit_${app.controller.formatString(task.name)}`
    ).onclick = () => renderTaskDetailsPopup(task);

    document.getElementById(
      `task_remove_${app.controller.formatString(task.name)}`
    ).onclick = () => app.controller.removeTask(task);
  };
  renderContentTask = (task) => {
    const anchor = app.view.createElement(
      "div",
      ``,
      document.querySelector(
        `#category_${app.controller.formatString(task.category)} .content-inner`
      ),
      `task_${app.controller.formatString(task.name)}`,
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
        `#category_${app.controller.formatString(
          task.category
        )} .content-inner .content-description`
      ).length < 2
    ) {
      document
        .querySelector(
          `#category_${app.controller.formatString(task.category)}`
        )
        .remove();
    }
    if (
      document.querySelector(
        `#content_${app.controller.formatString(task.group)}`
      ).childElementCount < 2
    ) {
      document
        .querySelector(`#content_${app.controller.formatString(task.group)}`)
        .remove();
    }
  };
}
