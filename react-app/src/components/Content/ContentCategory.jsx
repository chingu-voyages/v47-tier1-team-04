import ContentTask from "./ContentTask";
import ellipse from "../../images/Ellipse8.svg";
import { FaPlus } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

function ContentCategory({ tasks }) {
  return (
    <div className="content-main">
      <img
        src={ellipse}
        alt="ellipse checkbox"
        className="ellipse"
      />
      <div className="content-inner">
        <div className="content-task">
          <h3 className="activity">{tasks[0].category}</h3>
          <FaPencil />
          <div className="add-task">
            <FaPlus />
          </div>
        </div>
        {tasks.map((task, index) => (
          <ContentTask key={index} task={task} />
        ))}
      </div>
    </div>
  );
}

export default ContentCategory;
