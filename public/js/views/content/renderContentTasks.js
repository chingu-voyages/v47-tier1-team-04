import app from "../../app.js";
import { kebabCase } from "../../utilities/utilities.js";
import renderTaskDetailsPopup from "../modals/add-edit-task.js";
import renderViewTaskDetailsPopup from "../modals/view-task.js";

export const renderContentTask = (task) => {
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
    `<i class="fa-regular fa-square checkbox"></i> ${task.name}`,
    anchor,
    null,
    "task-name"
  );

  task.view = anchor;
  app.view.createElement(
    "div",
    `<i class="fa fa-circle task-priority-${task.priority}" aria-hidden="true"></i>
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
    null,
    "task-icons"
  );
  document.getElementById(
    `view_${kebabCase(task.name)}`
  ).onclick = () => {
    renderViewTaskDetailsPopup(task);
  };

  document.querySelector(`#task_${CSS.escape(kebabCase(task.name))} i.fa-circle`).onclick = () => app.controller.cyclePriority(task);
  
  document.getElementById(`edit_${kebabCase(task.name)}`).onclick = () =>
    renderTaskDetailsPopup(task);

  document.getElementById(`task_remove_${kebabCase(task.name)}`).onclick = () =>
    app.controller.removeTask(task);

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

  if (task.complete) {
    taskContainer.container.classList.toggle("complete");
    const taskCheckbox = document.querySelector(`#${taskContainer.id} i`);
    taskCheckbox.classList.remove("fa-square");
    taskCheckbox.classList.add("fa-square-check");
  }
};

const renderContentTasks = () => {
  app.tasks.map((task) => renderContentTask(task));
};
export default renderContentTasks;
