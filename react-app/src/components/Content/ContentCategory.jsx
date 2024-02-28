import ContentTask from "./ContentTask";
import ellipse from "../../images/Ellipse8.svg";

function ContentCategory({ categoryTasks }) {
  return (
    <div className="content-main">
      <img
        src={ellipse}
        alt="ellipse checkbox"
        className="ellipse"
      />
      <div className="content-inner">
        <div className="content-task">
          <h3 className="activity">{categoryTasks[0].category}</h3>
    
          <i class="fa-solid fa-plus add-task" />

        </div>
        {categoryTasks.map((task, index) => (
          <ContentTask key={index} task={task} />
        ))}
      </div>
    </div>
  );
}

export default ContentCategory;
