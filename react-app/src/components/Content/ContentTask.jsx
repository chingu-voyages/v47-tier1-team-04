import pencil from "../../images/mynaui_pencil.svg";
import trash from "../../images/ph_trash.svg";

function ContentTask({ task, archiveTask }) {
  return (
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
        <img src={pencil} alt="edit pencil" className="icon-update" />
        <img src={trash} alt="delete trash can" className="icon-edit" onClick={() => archiveTask(task)}/>
      </div>
    </div>
  );
}

export default ContentTask;
