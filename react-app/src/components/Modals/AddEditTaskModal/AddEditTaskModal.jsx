import { useRef, useId, useState } from "react";

function AddEditTaskModal({
  closeModal,
  saveData,
  addTask,
  updateTask,
  oldTask,
}) {
  const [task, setTask] = useState(oldTask ? oldTask : {});
  const groupRef = useRef(),
    categoryRef = useRef(),
    nameRef = useRef(),
    descriptionRef = useRef(),
    frequencyRef = useRef(),
    priorityRef = useRef(),
    dateRef = useRef(),
    scheduledTimeRef = useRef();

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!nameRef.current.value) errors.name = "Name is required";
    setErrors(errors);
    return errors;
  };
  const onFormSubmit = (e) => {
    // e.preventDefault();
    setErrors({});
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    const newTask = {
      group: groupRef.current.value,
      category: categoryRef.current.value,
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      days: Array.from(document.querySelectorAll(".days"))
        .filter((day) => day.checked)
        .map((day) => day.value),
      frequency: frequencyRef.current.value,
      priority: priorityRef.current.value,
      date: dateRef.current.value,
      scheduledTime: scheduledTimeRef.current.value,
    };

    if (errors.length) return console.error("Form has errors", errors);
    if (oldTask) {
      saveData();
      updateTask(oldTask, newTask);
      closeModal();
    } else {
      addTask(newTask);
      closeModal();
    }
  };

  return (
    <div id="edit-task-details-popup" className="task-details-popup">
      <form
        className="task-details-popup"
        id="edit_details"
        onSubmit={(e) => onFormSubmit(e)}
      >
        <div className="task-details-content">
          <i
            onClick={() => closeModal()}
            className="fa-solid fa-xmark fa-2x close-details-popup"
            id="close-details-popup"
          ></i>
          <h2>{oldTask ? "Edit" : "Add"} Task</h2>
          <div className="task-details-group">
            <div className="task-details">
              <label htmlFor="group">Group:</label>
              <input
                defaultValue={task.group}
                ref={groupRef}
                id="group"
                type="text"
                placeholder={task.group ? task.group : "Ungrouped"}
                name="group"
                required
              />
            </div>
            <div className="task-details">
              <label htmlFor="category">Category:</label>
              <input
                defaultValue={task.category}
                ref={categoryRef}
                id="category"
                type="text"
                placeholder={task.category ? task.category : "Uncategorized"}
                name="category"
                required
              />
            </div>
          </div>
          <div className="task-details-group task-details-due">
            <div className="task-details">
              <label htmlFor="name">Name:</label>
              <input
                defaultValue={task.name}
                ref={nameRef}
                id="name"
                type="text"
                name="name"
                placeholder={task.name ? task.name : "Enter a task name"}
                required
                size="50"
              />
            </div>
            <div className="task-details">
              <label htmlFor="description">Description:</label>
              <input
                ref={descriptionRef}
                defaultValue={task.description}
                id="description"
                type="text"
                name="description"
                placeholder={
                  task.description ? task.description : "Enter a description"
                }
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
                  defaultChecked={task.days && task.days.includes("Monday")}
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
                  defaultChecked={task.days && task.days.includes("Tuesday")}
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
                  defaultChecked={task.days && task.days.includes("Wednesday")}
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
                  defaultChecked={task.days && task.days.includes("Thursday")}
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
                  defaultChecked={task.days && task.days.includes("Friday")}
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
                  defaultChecked={task.days && task.days.includes("Saturday")}
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
                  defaultChecked={task.days && task.days.includes("Sunday")}
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
                defaultValue={task.frequency}
                ref={frequencyRef}
                id="frequency"
                type="text"
                placeholder={task.frequency ? task.frequency : "Once"}
                name="frequency"
                size="50"
              />
            </div>
            <div className="task-details-days">
              <label style={{ textAlign: "left" }} htmlFor="priority-select">
                Priority:
              </label>
              <select
                name="priority"
                id={useId()}
                ref={priorityRef}
                defaultValue={task.priority || 3}
              >
                <option value={3}>Low</option>
                <option value={2}>Medium</option>
                <option value={1}>High</option>
              </select>
            </div>
          </div>
          <div className="task-details-group" id="calander">
            <div className="task-details">
              <label htmlFor="modal-date">Due Date:</label>
              <input type="date" id="modal-date" name="date" ref={dateRef} />
            </div>
            <div className="task-details">
              <label htmlFor="modal-time">Time:</label>
              <input
                type="time"
                id="modal-time"
                name="scheduledTime"
                ref={scheduledTimeRef}
              />
            </div>
          </div>
          <a
            onClick={(e) => onFormSubmit(e)}
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

export default AddEditTaskModal;
