import app from "../../app.js";
import { kebabCase } from "../../utilities/utilities.js";
import renderViewTask from "../modals/view-task.js";
import renderEditTask from "../modals/edit-task.js";

const renderInfoButton = (task) => {
  const button = document.createElement("i");
  button.classList = "fa-solid fa-circle-info fa-2x detail";
  button.id = `task_view_${kebabCase(task.name)}`;
  return button.outerHTML;
};

const renderContentTask = (task) => {
  const anchor = app.view.createElement(
    "div",
    ``,
    document.querySelector(
      `#category_${kebabCase(task.category)} .content-inner`
    ),
    `task_${kebabCase(task.name)}`,
    "content-description"
  ).container;
  const taskContainer = app.view.createElement(
    "p",
    `<i></i> ${task.name}`,
    anchor,
    null,
    "task-name"
  );
  app.view.createElement(
    "div",
    `${renderInfoButton(task)}
    <img src="./img/mynaui_pencil.svg" alt="edit pencil image" class="icon-edit" id="task_edit_${kebabCase(
      task.name
    )}">
    <img src="./img/ph_trash.svg" alt="delect trash can image" class="icon-edit" id="task_remove_${kebabCase(
      task.name
    )}">`,
    anchor
  );
  task.view = anchor
  const infoButton = document.getElementById(
    `task_view_${kebabCase(task.name)}`
  );
  const editButton = document.getElementById(
    `task_edit_${kebabCase(task.name)}`
  );
  const removeButton = document.getElementById(
    `task_remove_${kebabCase(task.name)}`
  );
  infoButton.onclick = () => renderViewTask(task);
  editButton.onclick = () => renderEditTask(task);
  removeButton.onclick = () => app.controller.removeTask(task)
  const taskCheckbox = document.querySelector(`#${taskContainer.id} i`);
  if (task.complete) {
    taskContainer.container.classList.add("complete");
    taskCheckbox.classList = "fa-regular fa-square-check checkbox";
  } else {
    taskContainer.container.classList.remove("complete");
    taskCheckbox.classList = "fa-regular fa-square checkbox";
  }
  taskContainer.container.onclick = () =>
    app.controller.toggleCompleteTask(task);

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
};

const renderContentTasks = () => {
  app.tasks.map((task) => renderContentTask(task));
};
export default renderContentTasks;
