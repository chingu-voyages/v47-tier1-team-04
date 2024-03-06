import { useState } from "react";
import ContentTask from "./ContentTask";
import ellipse from "../../images/Ellipse8.svg";
import formatString from "../../utils/formatString";

function ContentCategory({
  group,
  category,
  updateGroups,
  saveData,
  archiveTask,
  updateTask,
  tasks,
  cyclePriority,
  toggleCompleteTask
}) {
  const [categoryTasks, setCategoryTasks] = useState(
    tasks.filter((task) => task.group === group && task.category === category)
  );
  const [categoryTask, setCategoryTask] = useState(categoryTasks[0]);

  if (!categoryTasks.every(task => task.archived)) return (
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
        {categoryTasks.map((task, index) => {
          if (!task.archived) return <ContentTask
            saveData={saveData}
            key={index}
            task={task}
            archiveTask={archiveTask}
            updateTask={updateTask}
            tasks={tasks}
            updateGroups={updateGroups}
            cyclePriority={cyclePriority}
            toggleCompleteTask={toggleCompleteTask}
          />;
        })}
      </div>
    </div>
  );
}

export default ContentCategory;
