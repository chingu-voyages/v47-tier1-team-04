import { useState, useEffect } from "react";
import formatString from "../../utils/formatString";
import ContentCategory from "./ContentCategory";
function ContentGroup({
  saveData,
  group,
  archiveTask,
  tasks,
  updateTask,
  updateGroups,
}) {
  const [groupTasks, setGroupTasks] = useState(
    tasks.filter((task) => task.group === group)
  );
  const [categories, setCategories] = useState([
    ...new Set(groupTasks.map((task) => task.category)),
  ]);
  const groupStr = groupTasks[0].group;
  
  if (!groupTasks.every((task) => task.archived))
    return (
      <div className="content-activity" id={`group_${formatString(groupStr)}`}>
        <h2 className="group-name">
          {groupStr} <i className="fa-solid"></i>{" "}
          <i className="fa fa-solid fa-edit"></i>
        </h2>
        {categories.map((category, index) => {
          const categoryTasks = groupTasks.filter(
            (task) => task.category === category
          );
          return (
            <ContentCategory
              group={group}
              category={category}
              updateGroups={updateGroups}
              saveData={saveData}
              key={index}
              groupTasks={groupTasks}
              setGroupTasks={setGroupTasks}
              categoryTasks={categoryTasks}
              archiveTask={archiveTask}
              updateTask={updateTask}
              tasks={tasks}
            />
          );
        })}
      </div>
    );
}
export default ContentGroup;
