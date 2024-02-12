import app from "../../app.js";
import { kebabCase } from "../../utilities/utilities.js";

export const removePopup = () => {
  let popup = document.querySelector(".task-details-popup");

  if (popup) {
    popup.remove();
  }
};

const renderEditTaskDetailsPopup = (task) => {
  removePopup();
  console.log(task.days.includes("Monday"));
  const detailsPopup = app.view.createElement(
    "div",
    `<form class="task-details-popup" id="edit_details">
          <div class="task-details-content">
            <i class="fa-solid fa-xmark fa-2x close-details-popup" id="close-details-popup"></i>            
              <h2>Edit Task</h2>
            <div class="task-details-group">
              <div class="task-details">
                  <label for="group">Group:</label>
                  <input type="text" value="${task.group}" name="group">
              </div>
              <div class="task-details">
                  <label for="category">Category:</label>
                  <input type="text"  value="${task.category}" name="category">
              </div>
            </div>

              <div class="task-details">
                  <label for="name">Name:</label>
                  <input type="text"  value="${
                    task.name
                  }" name="name" size="50">
              </div>              
              <div class="task-details">
              <label for="description">Description:</label>
              <input type="text"  value="${
                task.description
              }"  name="description" size="50">
          </div> 

          <div class="block">
          <label class="block" for="days">Days:</label>
              <div class="day-checkboxes" id="checkboxes">
                  <div class="checkbox-container">
                      <input type="checkbox" id="Monday" name="Monday" value="Monday" class="days" ${
                        task.days.includes("Monday") ? "checked" : ""
                      }>
                      <label for="Monday">Mon</label>
                  </div>
                  <div class="checkbox-container">
                      <input type="checkbox" id="Tuesday" name="Tuesday" value="Tuesday" class="days" ${
                        task.days.includes("Tuesday") ? "checked" : ""
                      }>
                      <label for="Tuesday">Tue</label>
                  </div>
                  <div class="checkbox-container">
                      <input type="checkbox" id="Wednesday" name="Wednesday" value="Wednesday" class="days" ${
                        task.days.includes("Wednesday") ? "checked" : ""
                      }>
                      <label for="Wednesday">Wed</label>
                  </div>
                  <div class="checkbox-container">
                      <input type="checkbox" id="Thursday" name="Thursday" value="Thursday" class="days" ${
                        task.days.includes("Thursday") ? "checked" : ""
                      }>
                      <label for="Thursday">Thur</label>
                  </div>
                  <div class="checkbox-container">
                      <input type="checkbox" id="Friday" name="Friday" value="Friday" class="days" ${
                        task.days.includes("Friday") ? "checked" : ""
                      }>
                      <label for="Friday">Fri</label>
                  </div>
                  <div class="checkbox-container">
                      <input type="checkbox" id="Saturday" name="Saturday" value="Saturday" class="days" ${
                        task.days.includes("Saturday") ? "checked" : ""
                      }>
                      <label for="Saturday">Sat</label>
                  </div>
                  <div class="checkbox-container">
                      <input type="checkbox" id="Sunday" name="Sunday" value="Sunday" class="days" ${
                        task.days.includes("Sunday") ? "checked" : ""
                      }>
                      <label for="Sunday">Sun</label>
                  </div>
          </div>
        </div>
          
          <div class="task-details-group task-details-due">
               <div class="task-details">
                 <label for="frequency">Frequency:</label>
                 <input type="text" value="${
                   task.frequency
                 }" name="frequency" size="50">                 
               </div>
               <div class="task-details-days">             
                  <label style="text-align:left" for="priority">Priority:</label>
                  <select id="priority-select" name="priority">
                    <option value=3 ${
                      task.priority == 3 || !task.priority ? "selected" : ""
                    }>Low</option>
                    <option value=2 ${
                      task.priority == 2 ? "selected" : ""
                    }> Medium</option>
                    <option value=1 ${
                      task.priority == 1 ? "selected" : ""
                    }>High</option>
                  </select>
              </div>
            </div>

          <div class="task-details-group" id="calander">
              <div class="task-details">
                  <label for="date">Due Date:</label>
                  <input type="date"  id="modal-date" name="date" value=${
                    task.date
                  }>
              </div>
              <div class="task-details">
                  <label for="scheduledTime">Time:</label>
                  <input type="time" id="modal-time" name="scheduledTime" value=${
                    task.scheduledTime
                  }>
              </div>
            </div>            
              <a class="btn btn-save btn-detail item-center" id="save-task-details">Save</a>              
           </div>              
      </div>`,
    document.getElementById("app"),
    "edit-task-details-popup",
    "task-details-popup"
  ).container;
  const updateDetailsButton = document.getElementById("save-task-details");
  updateDetailsButton.onclick = () => {
    const formInputs = Array.from(
      document.getElementById("edit_details").elements
    );
    const updatedTask = formInputs.reduce((acc, input) => {
      acc[input.name] = input.value;
      return acc;
    }, {});
    updatedTask.days = formInputs
      .filter((input) => input.type === "checkbox" && input.checked)
      .map((input) => input.value);
    updatedTask.priority = document.getElementById("priority-select").value;
    app.controller.updateTask(task, updatedTask);
  };

  const closeDetailsButton = document.querySelector("#close-details-popup");

  closeDetailsButton.onclick = () => detailsPopup.remove();
};

export default renderEditTaskDetailsPopup;
