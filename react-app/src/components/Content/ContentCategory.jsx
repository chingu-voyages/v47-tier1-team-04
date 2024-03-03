import ContentTask from "./ContentTask";
import ellipse from "../../images/Ellipse8.svg";

function ContentCategory({ categoryTasks }) {
  const categoryTask = categoryTasks[0];
  return (
    <div className="content-main" id={`category_${categoryTask.category}`}>
      <img
        src={ellipse}
        alt="ellipse checkbox"
        className="ellipse"
      />
      <div className="content-inner">
        <div className="content-task">
          <h3 className="activity">{categoryTask.category}</h3>
    
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
