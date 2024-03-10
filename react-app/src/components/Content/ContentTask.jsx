import { useState, useRef, useEffect } from "react";
import AddEditModal from "../Modals/AddEditTaskModal/AddEditTaskModal";
import ViewTaskModal from "../Modals/ViewTaskModal/ViewTaskModal";
import pencil from "../../images/mynaui_pencil.svg";
import trash from "../../images/ph_trash.svg";
import "./ContentTask.styles.css";
function ContentTask({
  updateGroups,
  saveData,
  task,
  addTask,
  archiveTask,
  updateTask,
  cyclePriority,
  toggleCompleteTask,
  showQuickTask,
  closeQuickTask,
  QuickTask,
}) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditQuickTask, setShowEditQuickTask] = useState(showQuickTask);
  const renderEditModal = () => setShowEditModal(true);
  const renderViewModal = () => setShowViewModal(true);
  const closeViewModal = () => setShowViewModal(false);
  const closeEditModal = () => setShowEditModal(false);

if (!task.archived) return (
    <>
      <div className="content-description">
        <p
          className={`task-name ${task.complete ? "complete" : ""}`}
          onClick={() => toggleCompleteTask(task)}
        >
          <i
            className={`fa-regular checkbox ${
              task.complete ? "fa-square-check" : "fa-square"
            }`}
          />{" "}
          {task.name}
        </p>
        <div className="task-icons">
          <i
            className={`fa fa-circle task-priority-${task.priority}`}
            aria-hidden="true"
            onClick={() => cyclePriority(task)}
          />
          <i
            className="fa-solid fa-circle-info fa-2x detail"
            onClick={() => renderViewModal()}
          />
          <img
            src={pencil}
            alt="edit pencil"
            className="icon-update"
            onClick={() => renderEditModal()}
          />
          <img
            src={trash}
            alt="delete trash can"
            className="icon-edit"
            onClick={() => archiveTask(task)}
          />
        </div>
      </div>

      {showViewModal && (
        <ViewTaskModal
          task={task}
          closeViewModal={closeViewModal}
          updateTask={updateTask}
        />
      )}
      {showEditModal && (
        <AddEditModal
          updateGroups={updateGroups}
          saveData={saveData}
          closeEditModal={closeEditModal}
          updateTask={updateTask}
          oldTask={task}
        />
      )}
    </>
  );
}

export default ContentTask;
