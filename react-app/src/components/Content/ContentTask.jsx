import { FaSquare, FaCircle } from "react-icons/fa";
import pencil from "../../images/mynaui_pencil.svg";
import trash from "../../images/ph_trash.svg";
import { FaCircleInfo } from "react-icons/fa6";

function ContentTask({ task }) {
  return (
    <div className="content-description">
      <p className="task-name">
        <FaSquare className="checkbox" /> {task.name}
      </p>
      <div id="task_options_name" className="task-icons">
        <FaCircle className={`task-priority-${task.priority}`} />
        <FaCircleInfo size={28} className="detail" />
        <img
          src={pencil}
          alt="edit pencil image"
          className="icon-update"
          id="edit_name"
        />
        <img
          src={trash}
          alt="delete trash can image"
          className="icon-edit"
          id="task_remove_name"
        />
      </div>
    </div>
  );
}

export default ContentTask;
