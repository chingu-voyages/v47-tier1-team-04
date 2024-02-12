import app from "../../app.js";
import { kebabCase } from "../../utilities/utilities.js";

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
              ${renderCloseDetailsButton()}
              <h2>Task Details</h2>
              <div class="task-details">
                  <label for="task_${kebabCase(task.name)}">Task Name:</label>
                  <input type="text"  value="${task.name}" id="task_${kebabCase(
      task.name
    )}-input" name="task_${kebabCase(task.name)}">
              </div>
              <div class="task-details">
                  <label for="category_${kebabCase(
                    task.category
                  )}">Category Name:</label>
                  <input type="text"  value="${
                    task.category
                  }" id="category_${kebabCase(
      task.category
    )}-input" name="category_${kebabCase(task.name)}">
              </div>
              <div class="task-details">
                  <label for="description-name">Description:</label>
                  <input type="text"  value="${task.name}" id="desc_${kebabCase(
      task.name.slice(0, 20)
    )}" name="description-name" size="50">
              </div>
              <div class="task-details">
                  <label for="modal-subtask">Subtask:</label>
                  <input type="checkbox"  id="modal-subtask" name="modal-subtask" value="subtask">
                  <input type="text"  id="modal-subtask" name="modal-subtask" placeholder="Add subtask...">
              </div>
              <div class="task-details">
                  <label for="modal-date">Date:</label>
                  <input type="text"  id="modal-date" name="modal-date">
              </div>
              <div class="task-details">
                  <label for="modal-time">Time:</label>
                  <input type="text"   id="modal-time" name="modal-time">
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

  const closeDetailsButton = document.getElementById("close-details-popup");

  closeDetailsButton.addEventListener("click", function () {
    removePopup();
  });

  return detailsPopup;
};

const renderEditTaskDetailsPopup = (task) => {
  let disabled = false;
  removePopup();
  const detailsPopup = app.view.createElement(
    "div",
    `<form class="task-details-popup">
          <div class="task-details-content">
            <i class="fa-solid fa-xmark fa-2x close-details-popup" id="close-details-popup"></i>
              <h2>Edit Task</h2>
            <div class="task-details-group">
              <div class="task-details">
                  <label for="task_${kebabCase(task.group)}">Group:</label>
                  <input type="text" value="${task.group}" id="task_${kebabCase(
      task.group
    )}-input" name="task_${kebabCase(task.group)}">
              </div>
              <div class="task-details">
                  <label for="category_${kebabCase(
                    task.category
                  )}">Category:</label>
                  <input type="text"  value="${
                    task.category
                  }" id="category_${kebabCase(
      task.category
    )}-input" name="category_${kebabCase(task.name)}">
              </div>
            </div>

              <div class="task-details">
                  <label for="description-name">Name:</label>
                  <input type="text"  value="${task.name}" id="name_${kebabCase(
      task.name.slice(0, 20)
    )}" name="description-name" size="50">
              </div>              
              <div class="task-details">
              <label for="task-description">Description:</label>
              <input type="text"  value="${task.description}" id="desc_${kebabCase(
      task.name.slice(0, 20)
    )}" name="description-description" size="50">
          </div>    
          <div class="task-details-group">
              <div class="task-details">
                  <label for="modal-date">Date:</label>
                  <input type="date"  id="modal-date" name="modal-date">
              </div>
              <div class="task-details">
                  <label for="modal-time">Time:</label>
                  <input type="time" id="modal-time" name="modal-time">
              </div>
            </div>

            <div class="task-details-group">
               <div class="task-details">
                 <label for="task-frequency">Frequency:</label>
                 <input type="text" value="${
                   task.frequency
                 }" id="desc_${kebabCase(
      task.frequency.slice(0, 20)
    )}" name="task-frequency" size="50">                 
               </div>
               <div class="task-details">
                 <label for="task-days">Days:</label>
                 <input type="text" value="${task.days}" id="desc_${
      task.days
    }" name="task-frequency" size="50">                 
               </div> 
              </div>
              <a href="#" class="btn btn-save btn-detail item-center" id="save-task-details">Save</a>              
           </div>              
      </div>`,
    document.getElementById("app"),
    "edit-task-details-popup",
    "task-details-popup"
  ).container;

  const updateDetailsButton = document.getElementById("save-task-details");
  updateDetailsButton.onclick = () => {
    const name = document.getElementById(
      `task_${kebabCase(task.name)}-input`
    ).value;
    const updatedTask = { ...task, name };

    app.controller.updateTask(task, updatedTask);
  };

  const closeDetailsButton = document.querySelector("#close-details-popup");

  closeDetailsButton.onclick = () => detailsPopup.remove();
};

export default renderEditTaskDetailsPopup;
