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
      <div className="task-icons">
        <FaCircle className={`task-priority-${task.priority}`} />
        <FaCircleInfo size={28} className="detail" />
        <img
          src={pencil}
          alt="edit pencil"
          className="icon-update"
        />
        <img
          src={trash}
          alt="delete trash can"
          className="icon-edit"
        />
      </div>
    </div>
  );
}

export default ContentTask;
