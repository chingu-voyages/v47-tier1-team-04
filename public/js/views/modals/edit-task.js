import app from "../../app.js";
import { kebabCase } from "../../utilities/utilities.js";

export const removePopup = () => {
  let popup = document.querySelector(".task-details-popup");
  if (popup) popup.remove();
  popup = document.querySelector('.modal');
  if (popup) popup.remove();
  popup = document.querySelectorAll('.modal');
};

const renderTaskDetailsPopup = (task) => {
  removePopup();
  const detailsPopup = app.view.createElement(
    "div",
    `<div class="task-details-popup">
          <div class="task-details-content">
              <i class="fa-solid fa-xmark fa-2x close-details-popup"></i>
              <h2>Task Details</h2>
              <div class="task-details">
                  <label for="task_${kebabCase(task.name)}">Task Name:</label>
                  <input type="text" value="${task.name}" id="task_${kebabCase(
      task.name
    )}-input" name="task_${kebabCase(task.name)}">
              </div>
              <div class="task-details">
                  <label for="category_${kebabCase(
                    task.category
                  )}">Category Name:</label>
                  <input type="text" value="${
                    task.category
                  }" id="category_${kebabCase(
      task.category
    )}-input" name="category_${kebabCase(task.name)}">
              </div>
              <div class="task-details">
                  <label for="description-name">Description:</label>
                  <input type="text" value="${task.name}" id="desc_${kebabCase(
      task.name.slice(0, 20)
    )}" name="description-name" size="50">
              </div>
              <div class="task-details">
                  <label for="modal-subtask">Subtask:</label>
                  <input type="checkbox" id="modal-subtask" name="modal-subtask" value="subtask">
                  <input type="text" id="modal-subtask" name="modal-subtask" placeholder="Add subtask...">
              </div>
              <div class="task-details">
                  <label for="modal-date">Date:</label>
                  <input type="text" id="modal-date" name="modal-date">
              </div>
              <div class="task-details">
                  <label for="modal-time">Time:</label>
                  <input type="text" id="modal-time" name="modal-time">
              </div>
              <div class="task-details">
                  <label for="priority-level">Priority:</label>
                  <select id="priority-level" name="priority-level">
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                  </select>
              </div>
              <textarea id="notes" name="notes" class="task-details" placeholder="Notes..."></textarea>
              <a href="#" class="btn btn-save btn-detail" id="save-task-details">Save</a>
          </div>
      </div>`,
    document.getElementById("app"),
    null,
    "task-details-popup"
  ).container;

  const closeDetailsButton = document.querySelector(".close-details-popup");
  closeDetailsButton.onclick = () => detailsPopup.remove();
};

export default renderTaskDetailsPopup;
