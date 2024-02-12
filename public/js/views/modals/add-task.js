import app from "../../app.js";
import Task from "../../utilities/task.js";
// export const renderModal = () => {

  export const removePopup = () => {
    let popup = document.querySelector(".task-details-popup");
  
    if (popup) {
      popup.remove();
    }
  };
  
  export const renderEditTaskDetailsPopup = () => {
    const task = new Task();
    task.days = new Array();
    task.group = "";
    task.category = "";
    task.name = "";
    task.description = "";
    task.frequency = "";
    removePopup();
    console.log(task.days.includes("Monday"));
    const detailsPopup = app.view.createElement(
      "div",
      `<form class="task-details-popup" id="edit_details">
            <div class="task-details-content">
              <i class="fa-solid fa-xmark fa-2x close-details-popup" id="close-details-popup"></i>            
                <h2>Add Task</h2>
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

  export const renderModalButton = () => {
    const thisButton = app.view.createElement(
      "div",
      '<i class="fa-solid fa-plus add-icon"></i>',
      document.getElementById("app"),
      "add-icon-el",
      "fa-solid fa-plus add-icon"
    );
    // renderEditTaskDetailsPopup(new Task());
    document.querySelector(".add-icon").onclick = () => (renderEditTaskDetailsPopup())
   // thisButton.onclick = () => (addButton.style.display = "block");
  }
  export default renderEditTaskDetailsPopup
 // export default renderModal


  /*
    app.view.createElement(
      "div",
      `<!-- this is hidden until click event -->
    <div class="modal-top-nav">
      <i class="fa-solid fa-xmark fa-2x" id="modal-close-el" ></i>
      <h2>Task Details</h2> 
      <a href="#" class="btn modal-btn-save">Save</a>
    </div>

    <div class="task-category">
      <div class="modal-task">
        <label for="task-name">Task Name</label><br>
        <input type="text" id="task-name" name="task-name" placeholder="Projects...">
      </div>
      <div class="modal-category">
        <label for="category-name">Category Name</label><br>
        <select name="categpory-name" id="category-name">
          <option value="routine">Routine Activites</option>
          <option value="studying">Studying</option>
          <option value="daily">Daily Task Project</option>
          <option value="chingu">Chingu</option>
        </select>
      </div>
    </div>

    <div class="modal-description">
        <label for="description-name">Description</label><br>
        <input type="text" id="description-name" name="description-name" size="50">
    </div>
    <div class="modal-subtask">
          <input type="checkbox" id="modal-subtask" name="modal-subtask" value="subtask">
          <input type="text" id="modal-subtask" name="modal-subtask" placeholder="Add subtask...">
    </div>

    <div class="modal-date-time">
      <div class="datepicker-spinbuttons modal-date" role="group" aria-labelledby="datepickerLabel datepickerDate">  
        <div id="datepickerLabel">Date</div>      
        <div class="dateinfo">
            <div class="date" id="datepickerDate"></div>
            <div class="day spinbutton">
                <div class="previous" aria-hidden="true">30</div>
                <div role="spinbutton" aria-valuenow="1" aria-valuetext="first" aria-valuemin="1" aria-valuemax="31" aria-label="Day">1</div>
                <div class="next" aria-hidden="true">2</div>
            </div>    
            <div class="month spinbutton">
                <div class="previous" aria-hidden="true">May</div>
                <div role="spinbutton" aria-valuenow="5" aria-valuetext="June" aria-valuemin="0" aria-valuemax="11" aria-label="Month">June</div>
                <div class="next" aria-hidden="true">July</div>
            </div>    
            <div class="year spinbutton">
                <div class="previous" aria-hidden="true">2018</div>
                <div role="spinbutton" aria-valuenow="2019" aria-valuemin="2019" aria-valuemax="2040" aria-label="Year">2019</div>
                <div class="next" aria-hidden="true">2020</div>
            </div>
        </div>
      </div>
    
      <div class="time modal-time">
        <div class="timepicker-spinbuttons" role="group" aria-labelledby="timepickerLabel timepickerDate">
            <div id="timepickerLabel">Time</div>
            <div class="time" id="timepickerDate"></div>
    
            <div class="hour spinbutton">
                <div class="previous" aria-hidden="true">11</div>
                <div role="spinbutton" aria-valuenow="1" aria-valuetext="first" aria-valuemin="1" aria-valuemax="12" aria-label="Hour">12</div>
                <div class="next" aria-hidden="true">1</div>
            </div>
    
            <div class="minute spinbutton">
                <div class="previous" aria-hidden="true">59</div>
                <div role="spinbutton" aria-valuenow="0" aria-valuetext="00" aria-valuemin="0" aria-valuemax="59" aria-label="Minute">00</div>
                <div class="next" aria-hidden="true">01</div>
            </div>
    
            <div class="ampm spinbutton">
                <div class="previous" aria-hidden="true">AM</div>
                <div role="spinbutton" aria-valuenow="AM" aria-valuetext="AM" aria-valuemin="AM" aria-valuemax="PM" aria-label="AM">AM</div>
                <div class="next" aria-hidden="true">PM</div>
            </div>
        </div>
      </div>
  </div>

    <div class="modal-priority">
      <label for="priority-level">Priority-level</label>
        <select name="priority-level" id="priority-level">
          <option value="low">Low</option>
          <option value="med">Med</option>
          <option value="high">High</option>                    
        </select>
    </div>

    <textarea name="notes" id="notes" class="notes" placeholder="Notes..."></textarea>
   <!-- end of modal -->
  <!-- https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/examples/datepicker-spinbuttons/ -->`,
      document.getElementById("app"),
      null,
      "modal"
    );

    // Modal pop-up
    const addIconEl = document.getElementById("add-icon-el");
    const modal = document.querySelector(".modal");
    const modalClose = document.getElementById("modal-close-el");

    addIconEl.addEventListener("click", function () {
      console.log("we have lift off");
      modal.style.display = "block";
    });

    modalClose.addEventListener("click", function () {
      modal.style.display = "none";
    });

    // Automatically populate details with task name and category from html
    // Get the task name and category name elements
    const taskNameElement = document.getElementById("task-name-1-1");
    const categoryNameElement = document.getElementById("category-name-1");

    // Get the input fields in the details popup
    const taskNameInput = document.getElementById("task-name-input");
    const categoryNameInput = document.getElementById("category-name-input");

    // Set the initial values of the input fields
    // taskNameInput.value = taskNameElement.textContent;
    // categoryNameInput.value = categoryNameElement.textContent;
  }

  
    */
  
  

 