import app from "../../app.js";
import label from "../utils/labels.js";

export const renderViewTaskDetailsPopup = (task) => {
  app.view.appViewController.removePopup();
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
                  ${
                    task.group === "Ungrouped" || task.group === ""
                      ? `
                  <label>Ungrouped</label>
                  <h3>&nbsp;</h3>
                  `
                      : `
                  <label>Group:</label>
                  <h3>${task.group}</h3>`
                  }
                </div>

                <div class="task-details">
                ${
                  task.category === "Uncategorized" || task.category === ""
                    ? `<label>Uncategorized</label>
                <h4>&nbsp;</h4>`
                    : `<label>Category:</label>
                <h4>${task.category}</h4>`
                }
              </div>
            </div>
            <div class="task-details-group border-shadow">
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
            </div>
            ${`<div class="task-details-group border-shadow-sub">
      <div class="task-details">
        <label>${task.frequency ? "Frequency:" : "No Frequency Set"}</label>
        <p>${task.frequency ? task.frequency : "&nbsp;"}</p>
      </div>
      ${
        task.days.length > 0
          ? `<div class="task-details">
      <label>Day${task.days.length > 1 ? "s" : ""}:</label>
      <p>${
        task.days.toString() === "Monday,Tuesday,Wednesday,Thursday,Friday"
          ? "Weekdays"
          : task.days.length === 7
          ? "Everyday"
          : task.days.toString() === "Saturday,Sunday"
          ? "Weekends"
          : task.days.toString()
      }</p>
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
  document.getElementById("close-task-details").onclick = () => app.view.appViewController.removePopup();

  closeDetailsButton.addEventListener("click", function () {
    app.view.appViewController.removePopup();
  });

  return detailsPopup;
};
export default renderViewTaskDetailsPopup;
