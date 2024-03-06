import { useState } from "react";
function ViewTaskModal({ closeViewModal, task }) {
  const {
    name,
    group,
    category,
    frequency,
    days,
    date,
    scheduledTime,
    priority,
  } = task;
  const [priorityColor, setPriorityColor] = useState("blue");
  const [priorityText, setPriorityText] = useState("Low");

  // Define a mapping from priority numbers to labels
  const priorities = {
    3: "Low",
    2: "Med",
    1: "High",
  };

  // Define a function to create a label for a given priority
  const label = (priority) => {
    // Get the label name from the priorities mapping, defaulting to 'Low' if the priority is not found
    const labelName = priorities[priority] || "Low";

    // Determine the color of the label based on the label name
    const color =
      labelName === "Low" ? "blue" : labelName === "Med" ? "orange" : "red";
    return {
      labelName,
      color,
    };
  };
  const priorityLabel = label(priority);
  return (
    <div id="view-task-details-popup" className="task-details-popup">
      <div className="task-details-popup">
        <div className="task-details-content">
          <i
            class="fa-solid fa-xmark fa-2x close-details-popup"
            onClick={() => closeViewModal()}
          />
          <label style={{ textAlign: "left" }}>Priority:</label>
          <a href="#" className={`btn btn-lite btn-${priorityLabel.color}`}>
            {priorityLabel.labelName}
          </a>
          <h2>Task Details</h2>
          <div className="task-details-group border-shadow">
            <div className="task-details">
              <label>Group:</label>
              <h3>{group}</h3>
            </div>
            <div className="task-details">
              <label>Category:</label>
              <h4>{category}</h4>
            </div>
          </div>
          <div className="task-details-group border-shadow">
            <div className="task-details border-shadow-sub">
              <label>Name:</label>
              <p>{name}</p>
            </div>
          </div>
          <div className="task-details-group border-shadow-sub">
            <div className="task-details">
              <label>No Frequency Set</label>
              <p>{frequency}</p>
            </div>
            <div className="task-details">
              <label>No Days Selected</label>
              <p>{days}</p>
            </div>
            <div className="task-details">
              <label>No Due Date</label>
              <p>{date}</p>
              <label>No Scheduled Time</label>
              <p>{scheduledTime}</p>
            </div>
          </div>
          <a
            className="btn btn-save btn-detail item-center close"
            id="close-task-details"
            onClick={() => closeViewModal()}
          >
            Close
          </a>
        </div>
      </div>
    </div>
  );
}

export default ViewTaskModal;
