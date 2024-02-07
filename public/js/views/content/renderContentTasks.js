import app from "../../app.js";
import { kebabCase } from "../../utilities/utilities.js";

const renderInfoButton = (task) => {
  app.view.createElement(
    "i",
    "",
    document.getElementById(`info_${task.name.slice(0, 7)}`),
    `button_${kebabCase(task.name).slice(0, 7)}`,
    "fa-solid fa-circle-info fa-2x detail"
  );
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
  app.view.createElement(
    "p",
    `<i class="fa-regular fa-square checkbox"></i> ${task.name}`,
    anchor,
    null,
    "task-name"
  );
  app.view.createElement(
    "div",
    `
    <img src="./img/mynaui_pencil.svg" alt="edit pencil image" class="icon-edit">
    <img src="./img/ph_trash.svg" alt="delect trash can image" class="icon-edit">`,
    anchor,
    `info_${kebabCase(task.name.slice(0, 7))}}`
  );

  renderInfoButton(task);
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

  // Complete task toggle
  // Add event listener to task names for marking as complete
  const taskNames = document.querySelectorAll(".task-name");

  taskNames.forEach(function (taskName) {
    taskName.addEventListener("click", function () {
      this.classList.toggle("complete");

      const checkboxIcon = this.closest(".content-description").querySelector(
        ".checkbox"
      );

      if (taskName.classList.contains("fa-square")) {
        checkboxIcon.classList.remove("fa-square");
        checkboxIcon.classList.add("fa-square-check");
      } else {
        checkboxIcon.classList.remove("fa-square-check");
        checkboxIcon.classList.add("fa-square");
      }
    });
  });
};

const renderContentTasks = () => {
  app.tasks.map((task) => renderContentTask(task));
};
export default renderContentTasks;
