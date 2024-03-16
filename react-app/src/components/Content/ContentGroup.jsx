import { useState, useEffect, useRef } from "react";
import formatString from "../../utils/formatString";
import ContentCategory from "./ContentCategory";
function ContentGroup({
  saveData,
  group,
  archiveTask,
  tasks,
  updateTask,
  updateGroups,
  cyclePriority,
  toggleCompleteTask,
  addTask,
  forceUpdate,
  setCompleteTask,
  setIncompleteTask
}) {
  const [editGroup, setEditGroup] = useState(false);  
  const [groupTasks, setGroupTasks] = useState(
    tasks.filter((task) => task.group === group)
  );
  const [categories, setCategories] = useState([
    ...new Set(groupTasks.map((task) => task.category)),
  ]);
  const [collapsed, setCollapsed] = useState(false);
  const collapse = (e) => {
    setCollapsed(!collapsed);
    e.target.nextElementSibling.classList.toggle("collapsed");
  }
  const groupStr = groupTasks[0].group;
  const groupRef = useRef(null);
  useEffect(() => {
    if (!groupRef.current.focus) groupRef.current.focus();
    groupRef.current.addEventListener("keydown", (e) => {

      if (e.key === "Enter") {
        if (e.target.innerText !== "") {
          groupTasks.forEach((task) => {
            const oldTask = task;
            const newTask = { ...task, group: e.target.innerText };
            updateTask(oldTask, newTask);
            e.target.innerText = newTask.group;
            setEditGroup(false);
            forceUpdate();
            saveData();
          });
        }
      }
    });
    groupRef.current.addEventListener("blur", (e) => {
      if (e.target.innerText !== "") {
        groupTasks.forEach((task) => {
          const oldTask = task;
          const newTask = { ...task, group: e.target.innerText };
          updateTask(oldTask, newTask);
          e.target.innerText = newTask.group;
          setEditGroup(false);
          forceUpdate();
          saveData();
        });
      }
    });
  }, [groupTasks]);
    return (
      <div className="content-activity" id={`group_${formatString(groupStr)}`}>
        <div className="group-name" style={{marginTop: '1em'}} onClick={e => collapse(e)}>
          <h2 contentEditable={editGroup} suppressContentEditableWarning={editGroup} ref={groupRef} className="group-name inline-block">{groupStr}</h2> <i className="fa-solid inline-block"></i>{" "}
          <i className="fa fa-solid fa-edit inline-block" onClick={e => {
            setEditGroup(true);
            groupRef.current.focus();
          }}></i>
        </div>
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
              addTask={addTask}
              groupTasks={groupTasks}
              setGroupTasks={setGroupTasks}
              categoryTasks={categoryTasks}
              archiveTask={archiveTask}
              updateTask={updateTask}
              cyclePriority={cyclePriority}
              tasks={tasks}
              toggleCompleteTask={toggleCompleteTask}
              forceUpdate={forceUpdate}
              setCompleteTask={setCompleteTask}
              setIncompleteTask={setIncompleteTask}
            />
          );
        })}
      </div>
    );
}
export default ContentGroup;
