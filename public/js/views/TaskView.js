import app from "../app.js";
import renderTaskDetailsPopup from "./modals/addEditTask.js";
import renderViewTaskDetailsPopup from "./modals/viewTask.js";

// Define the TaskViewController that manages tasks in a task management application. It provides methods to add, update, render, and remove tasks. It also provides methods to render task details and task options.

export default class TaskViewController {
  // Method to clear all tasks from a category
  clearTasks(group, category) {
    if (group)
      document.querySelector(
        `#content_${app.controller.formatString(group)}`
      ).innerHTML = "";
    if (category)
      document.querySelector(
        `#category_${app.controller.formatString(category)} .content-inner`
      ).innerHTML = "";
  }

  // Method to clear a specific task
  clearTask(task) {
    task.view.innerHTML = "";
  }

  // Method to update all tasks
  updateTasks(filter = app.tasks) {
    filter.forEach((task) => task.view.update(content));
  }

  // Method to update a specific task
  updateTask(task) {
    this.clearTask(task);
    this.renderContentTask(task);
  }

  // Method to add a task
  addTask(task) {
    // If the task group doesn't exist, create it
    if (
      task.group &&
      !document.querySelector(
        `#content_${app.controller.formatString(task.group)}`
      )
    ) {
      app.view.contentViewController.clearContentGroup(task.group);
      app.view.contentViewController.renderContentGroup(task.group);
    }

    // If the task category doesn't exist, update the app
    if (
      !document.querySelector(
        `#category_${app.controller.formatString(task.category)}`
      )
    ) {
      app.view.appViewController.updateApp();
    } else {
      // If the task category exists, render the task
      this.renderContentTask(task);
    }
  }

  // Method to render task details
  renderTaskDetails = (task, anchor) => {
    // Create the task container and set its onclick event
    const taskContainer = app.view.createElement(
      "p",
      `<i class="fa-regular fa-square checkbox"></i> ${task.name}`,
      anchor,
      `taskContainer_${app.controller.formatString(task.name)}`,
      "task-name"
    );
    task.view = anchor;
    taskContainer.container.onclick = () => {
      // Toggle task completion status and update the checkbox icon
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

    // Set the onclick event for the ellipse icon
    const ellipse = document.querySelector(
      `#ellipse_${app.controller.formatString(
        task.group
      )}_${app.controller.formatString(task.category)}`
    );
    if (ellipse) {
      ellipse.onclick = () => {
        // Toggle task completion status for all tasks in the same category
        const contentInner = ellipse
          .closest(".content-main")
          .querySelector(".content-inner");
        if (ellipse.src.includes("Ellipse8.svg")) {
          ellipse.src = "./img/favicon.png";
          contentInner.classList.add("darken");
          app.tasks
            .filter((taskFilter) => taskFilter.category === task.category)
            .forEach((filteredTask) => {
              filteredTask.setComplete();
              this.updateTask(filteredTask);
            });
        } else {
          ellipse.src = "./img/Ellipse8.svg";
          contentInner.classList.remove("darken");
          app.tasks
            .filter((taskFilter) => taskFilter.category === task.category)
            .forEach((filteredTask) => {
              filteredTask.setIncomplete();
              this.updateTask(filteredTask);
            });
        }
      };
    }

    // Render the task options div
    this.renderTaskOptionsDiv(task, anchor);

    // If the task is complete, update the checkbox icon
    if (task.complete) {
      taskContainer.container.classList.toggle("complete");
      const taskCheckbox = document.querySelector(`#${taskContainer.id} i`);
      if (taskCheckbox) {
        taskCheckbox.classList.remove("fa-square");
        taskCheckbox.classList.add("fa-square-check");
      }
    }
  };

  // Method to render the task options div
  renderTaskOptionsDiv = (task, anchor) => {
    // Create the task options div and set the onclick events for its buttons
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
          <img src="./img/ph_trash.svg" alt="delete trash can image" class="icon-edit" id="task_remove_${app.controller.formatString(
            task.name
          )}">`,
      anchor,
      `task_options_${app.controller.formatString(task.name)}`,
      "task-icons"
    );

    const viewTaskButton = document.getElementById(
      `view_${app.controller.formatString(task.name)}`
    );
    const cyclePriorityButton = document.querySelector(
      `#task_options_${app.controller.formatString(task.name)} i.fa-circle`
    );
    const editButton = document.getElementById(
      `edit_${app.controller.formatString(task.name)}`
    );

    if (viewTaskButton) {
      viewTaskButton.onclick = () => {
        renderViewTaskDetailsPopup(task);
      };
    }

    if (cyclePriorityButton) {
      cyclePriorityButton.onclick = () => {
        if (task.complete) {
          const taskContainer = document.getElementById(
            `taskContainer_${app.controller.formatString(task.name)}`
          );
          taskContainer.classList.remove("complete");
          const taskCheckbox = taskContainer.querySelector("i");
          taskCheckbox.classList.remove("fa-square-check");
          taskCheckbox.classList.add("fa-square");
        }
        app.controller.cyclePriority(task);
        const priorityButton = task.view.querySelector(".fa-circle");
        priorityButton.classList.remove(
          "task-priority-1",
          "task-priority-2",
          "task-priority-3"
        );
        priorityButton.classList.add(`task-priority-${task.priority}`);
      };
    }

    if (editButton) {
      editButton.onclick = () => renderTaskDetailsPopup(task);
    }

    const removeTaskButton = document.getElementById(
      `task_remove_${app.controller.formatString(task.name)}`
    );

    if (removeTaskButton) {
      removeTaskButton.onclick = () => app.controller.removeTask(task);
    }
  };

  // Method to render a task
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

  // Method to render all tasks
  renderContentTasks = (filter = app.tasks) => {
    filter.forEach((task) => this.renderContentTask(task));
  };

  // Method to update a task
  updateTask = (task) => {
    this.clearTask(task);
    this.renderTaskDetails(task, task.view);
  };

  // Method to remove a task
  removeTask = (task) => {
    task.view.remove();

    // If the task category is empty, remove it
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

    // If the task group is empty, remove it
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
