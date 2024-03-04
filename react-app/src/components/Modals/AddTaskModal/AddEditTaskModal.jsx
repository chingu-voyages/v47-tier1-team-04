import { useState, useId } from "react";
function AddEditModal({ closeModal, addTask, tasks }) {
  const [task, setTask] = useState({});
  const onFormChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };
  const saveTask = () => {
    if (!task.group) task.group = "Ungrouped";
    if (!task.category) task.category = "Uncategorized";
    if (!task.name) return; // check if required fields are filled
    if (!task.priority) task.priority = 3; // set default priority
    if (task.name && tasks.filter((t) => t.name === task.name).length > 0) return; // check if task already exists
    addTask(task);
    closeModal();
  };
  return (
    <div id="edit-task-details-popup" className="task-details-popup">
      <form
        className="task-details-popup"
        id="edit_details"
        onBlur={(e) => onFormChange(e)}
      >
        <div className="task-details-content">
          <i
            onClick={() => closeModal()}
            className="fa-solid fa-xmark fa-2x close-details-popup"
            id="close-details-popup"
          ></i>
          <h2>Add Task</h2>
          <div className="task-details-group">
            <div className="task-details">
              <label htmlFor="group">Group:</label>
              <input
                id="group"
                type="text"
                placeholder="Ungrouped"
                name="group"
                required
              />
            </div>
            <div className="task-details">
              <label htmlFor="category">Category:</label>
              <input
                id="category"
                type="text"
                placeholder="Uncategorized"
                name="category"
                required
              />
            </div>
          </div>
          <div className="task-details-group task-details-due">
            <div className="task-details">
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter a task name"
                required
                size="50"
              />
            </div>
            <div className="task-details">
              <label htmlFor="description">Description:</label>
              <input
                id="description"
                type="text"
                name="description"
                size="50"
              />
            </div>
          </div>
          <div className="block">
            <label className="block" htmlFor="Monday">
              Days:
            </label>
            <div className="day-checkboxes" id="checkboxes">
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id="Monday"
                  name="Monday"
                  value="Monday"
                  className="days"
                />
                <label htmlFor="Monday">Mon</label>
              </div>
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id="Tuesday"
                  name="Tuesday"
                  value="Tuesday"
                  className="days"
                />
                <label htmlFor="Tuesday">Tue</label>
              </div>
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id="Wednesday"
                  name="Wednesday"
                  value="Wednesday"
                  className="days"
                />
                <label htmlFor="Wednesday">Wed</label>
              </div>
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id="Thursday"
                  name="Thursday"
                  value="Thursday"
                  className="days"
                />
                <label htmlFor="Thursday">Thur</label>
              </div>
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id="Friday"
                  name="Friday"
                  value="Friday"
                  className="days"
                />
                <label htmlFor="Friday">Fri</label>
              </div>
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id="Saturday"
                  name="Saturday"
                  value="Saturday"
                  className="days"
                />
                <label htmlFor="Saturday">Sat</label>
              </div>
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id="Sunday"
                  name="Sunday"
                  value="Sunday"
                  className="days"
                />
                <label htmlFor="Sunday">Sun</label>
              </div>
            </div>
          </div>
          <div className="task-details-group task-details-due">
            <div className="task-details">
              <label htmlFor="frequency">Frequency:</label>
              <input id="frequency" type="text" name="frequency" size="50" />
            </div>
            <div className="task-details-days">
              <label style={{ textAlign: "left" }} htmlFor="priority-select">
                Priority:
              </label>
              <select id={useId()} name="priority" >
                <option value="3">
                  Low
                </option>
                <option value="2">Medium</option>
                <option value="1">High</option>
              </select>
            </div>
          </div>
          <div className="task-details-group" id="calander">
            <div className="task-details">
              <label htmlFor="modal-date">Due Date:</label>
              <input type="date" id="modal-date" name="date" />
            </div>
            <div className="task-details">
              <label htmlFor="modal-time">Time:</label>
              <input type="time" id="modal-time" name="scheduledTime" />
            </div>
          </div>
          <a
            onClick={() => saveTask()}
            className="btn btn-save btn-detail item-center"
            id="save-task-details"
          >
            Save
          </a>
        </div>
      </form>
    </div>
  );
}

export default AddEditModal;