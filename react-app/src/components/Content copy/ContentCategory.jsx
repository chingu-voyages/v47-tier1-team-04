import { useState } from "react";
import ContentTask from "./ContentTask";
import ellipse from "../../images/Ellipse8.svg";
import formatString from "../../utils/formatString";

function ContentCategory({
  groupTasks,
  setGroupTasks,
  updateGroups,
  saveData,
  categoryTasks,
  archiveTask,
  updateTask,
  tasks,
}) {
  const [categoryTask, setCategoryTask] = useState(categoryTasks[0]);
  
  return (
    <div
      className="content-main"
      id={`category_${formatString(categoryTask.category)}`}
    >
      <img src={ellipse} alt="ellipse checkbox" className="ellipse" />
      <div className="content-inner">
        <div className="content-task">
          <h3 className="activity">{categoryTask.category}</h3>

          <i className="fa-solid fa-plus add-task" />
        </div>
        {categoryTasks.map((task, index) => (
          <ContentTask
            saveData={saveData}
            key={index}
            task={task}
            archiveTask={archiveTask}
            updateTask={updateTask}
            tasks={tasks}
            updateGroups={updateGroups}
          />
        ))}
      </div>
    </div>
  );
}

export default ContentCategory;
