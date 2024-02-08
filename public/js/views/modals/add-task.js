import app from "../../app.js";
import { clearPopups } from "./index.js";

const renderModal = () => {
  let modal = document.querySelector(".modal");
  if (modal) clearPopups();
  else
    modal = app.view.createElement(
      "div",
      `<!-- this is hidden until click event -->
    <div class="modal-top-nav">
      <i class="fa-solid fa-xmark fa-2x" id="modal-close-el" ></i>
      <h2>Task Details</h2> 
      <a href="#" class="btn modal-btn-save" id="modal-btn-save">Save</a>
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
    ).container;
  document.getElementById("modal-close-el").onclick = () => modal.remove();
  document.getElementById("modal-btn-save").onclick = () => {
    modal.remove()
    app.controller.saveData();
  };
};

const renderModalButton = () => {
  app.view.createElement(
    "div",
    '<i class="fa-solid fa-plus add-icon"></i>',
    document.getElementById("app"),
    "add-icon-el",
    "fa-solid fa-plus add-icon"
  );
  document.getElementById("add-icon-el").onclick = () => renderModal();
};

export default renderModalButton;
