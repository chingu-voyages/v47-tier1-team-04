import app from "../../app.js";
import { kebabCase } from "../../utilities/utilities.js";

export const removePopup = () => {
  let popup = document.querySelector(".task-details-popup");
  if (popup) popup.remove();
  popup = document.querySelector(".modal");
  if (popup) popup.remove();
  popup = document.querySelectorAll(".modal");
};
const renderTaskDetailsPopup = (task) => {
  const { name, group, category, frequency, days, calander, complete } = task;
  removePopup();
  const detailsPopup = app.view.createElement(
    "div",
    `
    <div class="task-details-popup">
    <div class="task-details-content">
      <i class="fa-solid fa-xmark fa-2x close-details-popup"></i>
      <h2>Task Details</h2>
      <div class="task-details-group border-shadow">
          <div class="task-details">
            <label>Task Group:</label>
            <h3>${group}</h3>
          </div>
          <div class="task-details">
            <label>Category Name:</label
            >
            <h4>${category}</h4>
          </div>
      </div>
      <div class="task-details border-shadow-sub">
        <label>Task:</label>
        <p>${name}</p>
      </div>

      <div class="task-details-group border-shadow-sub">
          <div class="task-details">
            <label>Frequency:</label>
            <p>${frequency}</p>
          </div>
          <div class="task-details">
            <label>Days:</label>
            <p>${days}</p>
          </div>
      </div>
      <div class="task-details border-shadow-sub">
        <label>Calander:</label>
        <p>${calander}</p>
      </div>
      <div class="task-details border-shadow-sub">
        <label>Complete:</label>
        <p>${complete}</p>
      </div>
      <a class="btn btn-save btn-detail item-center" id="close-task-details"
        >Close</a
      >
    </div>
  </div>
    `,
    document.getElementById("app"),
    null,
    "task-details-popup"
  ).container;

  document.querySelector(".close-details-popup").onclick = () =>
    detailsPopup.remove();
  document.getElementById("close-task-details").onclick = () =>
    detailsPopup.remove();
};

export default renderTaskDetailsPopup;
