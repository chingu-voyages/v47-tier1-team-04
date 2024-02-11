import app from "../../app.js";
import { kebabCase } from "../../utilities/utilities.js";

export const removePopup = () => {
  let popup = document.querySelector(".task-details-popup");

  if (popup) {
    popup.remove();
  }
}

const taskModal = (task, disabled) => {
  removePopup();
  const detailsPopup = app.view.createElement(
    "div",
    `<div class="task-details-popup">
          <div class="task-details-content">
              ${renderCloseDetailsButton()}
              <h2>Task Details</h2>
              <div class="task-details-group border-shadow">
                <div class="task-details">
                  <label>Task Group:</label>
                  <h3>${task.group}</h3>
                </div>

                <div class="task-details">
                <label>Category Name:</label>
                <h4>${task.category}</h4>
              </div>
            </div>

            <div class="task-details border-shadow-sub">
                <label>Task:</label>
                <p>${task.name}</p>
            </div>

              <!-- <div class="task-details">
                   <label for="modal-subtask">Subtask:</label>
                   <input type="checkbox" disabled=${disabled}id="modal-subtask" name="modal-subtask" value="subtask">
                   <input type="text" disabled=${disabled} id="modal-subtask" name="modal-subtask" placeholder="Add subtask...">
               </div> -->

            <div class="task-details-group border-shadow-sub">
               <div class="task-details">
                 <label>Frequency:</label>
                 <p>${task.frequency}</p>
               </div>
               <div class="task-details">
                 <label>Days:</label>
                 <p>${task.days}</p>
               </div>
            </div>

              <div class="task-details">
                  <div class="task-details border-shadow-sub">
                  <label>Calander:</label>
                  <p>${task.calander}</p>
                </div>
                <div class="task-details border-shadow-sub">
                  <label>Complete:</label>
                  <p>${task.complete}</p>
                </div>
          </div>
          <a class="btn btn-save btn-detail item-center close" id="close-task-details">Close</a>
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
}

const renderTaskDetailsPopup = () => {

  const openDetailsButtons = document.querySelectorAll(".fa-circle-info");

  openDetailsButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      console.log("details here!");
      const taskData = JSON.parse(this.getAttribute('data-my-object'));
      const disabled = true;
      const detailsPopup = taskModal(taskData, disabled);
      detailsPopup.style.display = "block";
    });
  });

  const updateDetailsButtons = document.querySelectorAll(".icon-update");
  

  // const closeDetailsButton = document.querySelector(".close-details-popup");

  // closeDetailsButton.addEventListener("click", function () {
  //   detailsPopup.style.display = "none";
  // });
};

// Details Popup for tasks
const renderCloseDetailsButton = () => {
  const button = document.createElement("i");
  button.classList = "fa-solid fa-xmark fa-2x close-details-popup";
  button.id = 'close-details-popup';
  return button.outerHTML;
};

// Create a close button ep
const createCloseButtonHTML = () => {
  const button = document.createElement("a");
  button.classList = "btn btn-save btn-detail item-center";
  button.id = 'close-task-details';
  button.textContent = "Close";
  return button.outerHTML;
};

const closeButtonHTML = createCloseButtonHTML();

document.addEventListener("click", function(event) {
  if (event.target.id === "close-task-details") {
    closeModal();
  }
});

const closeModal = function() {
  const modal = document.querySelector(".task-details-popup");
  modal.style.display = "none";
};

export default renderTaskDetailsPopup;
