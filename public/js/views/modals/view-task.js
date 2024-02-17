import app from "../../app.js";
import { kebabCase } from "../../utilities/utilities.js";
import label from "../utils/labels.js";

export const removePopup = () => {
  let popup = document.querySelector(".task-details-popup");

  if (popup) {
    popup.remove();
  }
};

export const renderViewTaskDetailsPopup = (task) => {
  removePopup();
  console.log(task);
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

                 ${
                   task.description
                     ? `<div class="task-details border-shadow-sub">
            <label>Description:</label>
            <p>${task.description}</p>
            </div>`
                     : ""
                 }
            ${`<div class="task-details-group border-shadow-sub">
      <div class="task-details">
        <label>${task.frequency ? "Frequency:" : "No Frequency Set"}</label>
        <p>${task.frequency ? task.frequency : "&nbsp;"}</p>
      </div>
      ${
        task.days.length > 0
          ? `<div class="task-details">
      <label>Day${task.days.length > 1 ? "s" : ""}:</label>
      <p>${task.days}</p>
    </div>`
          : `<div class="task-details">
             <label>No Days Selected</label>
              <p>&nbsp;</p>
             </div>`
      }
      <div class="task-details">
        <label>${
          task.date && task.scheduledTime
            ? "Due Date:"
            : task.date
            ? "Due Date"
            : task.scheduledTime
            ? "Scheduled Time"
            : "No Due Date"
        }</label>
        ${
          task.date && task.scheduledTime
            ? `<p>${task.date} at ${task.scheduledTime}</p>`
            : task.date || task.scheduledTime
            ? `<p>${task.date || task.scheduledTime}</p>`
            : "<p>&nbsp;</p>"
        }
      </div>
   </div>`}             
          <a class="btn btn-save btn-detail item-center close" id="close-task-details">Close</a>
      </div>`,
    document.getElementById("app"),
    "view-task-details-popup",
    "task-details-popup"
  ).container;

  const closeDetailsButton = document.getElementById("close-details-popup");
  document.getElementById("close-task-details").onclick = () => removePopup();

  closeDetailsButton.addEventListener("click", function () {
    removePopup();
  });

  return detailsPopup;
};
export default renderViewTaskDetailsPopup;
