import app from "../../app.js";

export const removePopup = () => {
  let popup = document.querySelector(".task-details-popup");

  if (popup) {
    popup.remove();
  }
};

export const renderAddTaskDetailsPopup = () => {
  removePopup()
  const detailsPopup = app.view.createElement(
    "form",
    `<form class="task-details-popup" id="edit_details">
            <div class="task-details-content">
              <i class="fa-solid fa-xmark fa-2x close-details-popup" id="close-details-popup"></i>            
                <h2>Add Task</h2>
              <div class="task-details-group">
                <div class="task-details">
                    <label for="group">Group:</label>
                    <input type="text"  name="group">
                </div>
                <div class="task-details">
                    <label for="category">Category:</label>
                    <input type="text" name="category">
                </div>
              </div>
  
                <div class="task-details">
                    <label for="name">Name:</label>
                    <input type="text" id="required" name="name" size="50">
                </div>              
                <div class="task-details">
                <label for="description">Description:</label>
                <input type="text"   name="description" size="50">
            </div> 
  
            <div class="block">
            <label class="block" for="days">Days:</label>
                <div class="day-checkboxes" id="checkboxes">
                    <div class="checkbox-container">
                        <input type="checkbox" id="Monday" name="Monday" value="Monday" class="days">
                        <label for="Monday">Mon</label>
                    </div>
                    <div class="checkbox-container">
                        <input type="checkbox" id="Tuesday" name="Tuesday" value="Tuesday" class="days" >
                        <label for="Tuesday">Tue</label>
                    </div>
                    <div class="checkbox-container">
                        <input type="checkbox" id="Wednesday" name="Wednesday" value="Wednesday" class="days" >
                        <label for="Wednesday">Wed</label>
                    </div>
                    <div class="checkbox-container">
                        <input type="checkbox" id="Thursday" name="Thursday" value="Thursday" class="days" >
                        <label for="Thursday">Thur</label>
                    </div>
                    <div class="checkbox-container">
                        <input type="checkbox" id="Friday" name="Friday" value="Friday" class="days" >
                        <label for="Friday">Fri</label>
                    </div>
                    <div class="checkbox-container">
                        <input type="checkbox" id="Saturday" name="Saturday" value="Saturday" class="days" >
                        <label for="Saturday">Sat</label>
                    </div>
                    <div class="checkbox-container">
                        <input type="checkbox" id="Sunday" name="Sunday" value="Sunday" class="days" >
                        <label for="Sunday">Sun</label>
                    </div>
            </div>
          </div>
            
            <div class="task-details-group task-details-due">
                 <div class="task-details">
                   <label for="frequency">Frequency:</label>
                   <input type="text" name="frequency" size="50">                 
                 </div>
                 <div class="task-details-days">             
                    <label style="text-align:left" for="priority">Priority:</label>
                    <select id="priority-select" name="priority">
                      <option value=3>Low</option>
                      <option value=2> Medium</option>
                      <option value=1>High</option>
                    </select>
                </div>
              </div>
  
            <div class="task-details-group" id="calander">
                <div class="task-details">
                    <label for="date">Due Date:</label>
                    <input type="date"  id="modal-date" name="date">
                </div>
                <div class="task-details">
                    <label for="scheduledTime">Time:</label>
                    <input type="time" id="modal-time" name="scheduledTime" >
                </div>
              </div>            
                <a class="btn btn-save btn-detail item-center" id="save-task-details">Save</a>              
             </div>              
        </div>`,
    document.getElementById("app"),
    "view-task-details-popup",
    "task-details-popup"
  ).container;
  
  const saveDetailsButton = document.getElementById("save-task-details");
  saveDetailsButton.onclick = () => {
    const nameInput = document.getElementById("required");
    if (nameInput.value === "") {
      nameInput.style.border = "1px solid red";
      nameInput.placeholder = "Please provide a task name";
      return;
    } else document.getElementById("required").style.border = "none";
    const formInputs = Array.from(
      document.getElementById("view-task-details-popup").elements
    );
    const newTask = formInputs.reduce((acc, input) => {
      acc[input.name] = input.value;
      return acc;
    }, {});
    newTask.days = [...formInputs
      .filter((input) => input.type === "checkbox" && input.checked)
      .map((input) => input.value)]
    newTask.priority = document.querySelector("#view-task-details-popup #priority-select").value;
    newTask.complete = false;
    app.controller.addTask(newTask);
  };

  const closeDetailsButton = document.querySelector("#view-task-details-popup #close-details-popup");

  closeDetailsButton.onclick = () => detailsPopup.remove();
};

export const renderModalButton = () => {
  app.view.createElement(
    "div",
    '<i class="fa-solid fa-plus add-icon"></i>',
    document.getElementById("app"),
    "add-icon-el",
    "fa-solid fa-plus add-icon"
  );
  // renderEditTaskDetailsPopup(new Task());
  document.querySelector(".add-icon").onclick = () =>
    renderAddTaskDetailsPopup();
};
export default renderAddTaskDetailsPopup;
