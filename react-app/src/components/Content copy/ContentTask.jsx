import {useState} from "react";
import AddEditModal from "../Modals/AddEditTaskModal/AddEditTaskModal";
import pencil from "../../images/mynaui_pencil.svg";
import trash from "../../images/ph_trash.svg";

function ContentTask({ updateGroups, saveData, task, archiveTask, updateTask }) {
  const [contentTask, setContentTask] = useState(task);
  const [showModal, setShowModal] = useState(false);
  const renderEditModal= () => {
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);
  return (
<>
<div className="content-description">
      <p className={`task-name ${task.complete ? "complete" : ""}`}>
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
        />
        <i className="fa-solid fa-circle-info fa-2x detail" />
        <img src={pencil} alt="edit pencil" className="icon-update" onClick={() => renderEditModal()} />
        <img src={trash} alt="delete trash can" className="icon-edit" onClick={() => archiveTask(task)}/>
      </div>
    </div>

    {showModal && <AddEditModal updateGroups={updateGroups} saveData={saveData} closeModal={closeModal} updateTask={updateTask} oldTask={task} />}
</>
  );
}

export default ContentTask;
