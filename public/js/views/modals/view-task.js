import app from "../../app.js";
import { kebabCase } from "../../utilities/utilities.js";
import label from "../utils/labels.js";

export const removePopup = () => {
  let popup = document.querySelector(".task-details-popup");

  if (popup) {
    popup.remove();
  }
};

const taskModal = (task, disabled) => {
  removePopup();
  const detailsPopup = app.view.createElement(
    "div",
    `<div class="task-details-popup">
          <div class="task-details-content">
              <i class="fa-solid fa-xmark fa-2x close-details-popup" id="close-details-popup"></i>
              <label style="text-align:left">Priority:</label>
            ${label(task.priority)}
              <h2>Task Details</h2>
              <div class="task-details-group border-shadow">
                <div class="task-details">
                  <label>Group:</label>
                  <h3>${task.group}</h3>
                </div>

                <div class="task-details">
                <label>Category:</label>
                <h4>${task.category}</h4>
              </div>
            </div>

            <div class="task-details border-shadow-sub">
                <label>Name:</label>
                <p>${task.name}</p>
            </div>

            <div class="task-details border-shadow-sub">
                <label>Description:</label>
                <p>${task.description}</p>
            </div>

            <!-- ${task.description? `<div class="task-details border-shadow-sub">
            <label>Description:</label>
            <p>${task.description}</p>
            </div>`
                : ""
            } -->
            ${
              task.calendar
                ? `<div class="task-details">
            <div class="task-details border-shadow-sub">
            <label>Due Date:</label>
            <p>${task.calander}</p>
          </div>
      </div>`
                : `<div class="task-details-group border-shadow-sub">
      <div class="task-details">
        <label>Frequency:</label>
        <p>${task.frequency}</p>
      </div>
      <div class="task-details">
        <label>Days:</label>
        <p>${task.days}</p>
      </div>
      <div class="task-details">
        <label>Due Date:</label>
        <p>${task.dueDate}</p>
      </div>
   </div>`
            }
        <!--   <label style="text-align:left">Priority:</label>
            ${label(task.priority)} -->

              
          <a class="btn btn-save btn-detail item-center close" id="close-task-details">Close</a>
      </div>`,
    document.getElementById("app"),
    "view-task-details-popup",
    "task-details-popup"
  ).container;

  const closeDetailsButton = document.getElementById("close-details-popup");

  closeDetailsButton.addEventListener("click", function () {
    removePopup();
  });

  return detailsPopup;
};

const renderTaskDetailsPopup = () => {
  const openDetailsButtons = document.querySelectorAll(".fa-circle-info");

  openDetailsButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      console.log("details here!");
      const taskData = JSON.parse(this.getAttribute("data-my-object"));
      const disabled = true;
      const detailsPopup = taskModal(taskData, disabled);
      detailsPopup.style.display = "block";
    });
  });
};

document.addEventListener("click", function (event) {
  if (event.target.id === "close-task-details") {
    closeModal();
  }
});

const closeModal = function () {
  const modal = document.querySelector(".task-details-popup");
  modal.style.display = "none";
};

export default renderTaskDetailsPopup;
