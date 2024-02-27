import { FaWindowClose } from "react-icons/fa";

function AddEditModal({ closeModal}) {
  return (
    <div id="edit-task-details-popup" className="task-details-popup">
      <form className="task-details-popup" id="edit_details">
        <div className="task-details-content">
        <FaWindowClose onClick={() => closeModal()} className="fa-solid fa-xmark fa-2x close-details-popup" />

          <h2>Add Task</h2>
          <div className="task-details-group">
            <div className="task-details">
              <label htmlFor="group">Group:</label>
              <input
                id="group"
                type="text"
                placeholder="Ungrouped"
                value=""
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
                value=""
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
                value=""
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
                value=""
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
              <input
                id="frequency"
                type="text"
                value=""
                name="frequency"
                size="50"
              />
            </div>
            <div className="task-details-days">
              <label style={{ textAlign: "left" }} htmlFor="priority-select">
                Priority:
              </label>
              <select id="priority-select" name="priority">
                <option value="3" selected>
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
              <input type="date" id="modal-date" name="date" value="" />
            </div>
            <div className="task-details">
              <label htmlFor="modal-time">Time:</label>
              <input
                type="time"
                id="modal-time"
                name="scheduledTime"
                value=""
              />
            </div>
          </div>
          <a
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
