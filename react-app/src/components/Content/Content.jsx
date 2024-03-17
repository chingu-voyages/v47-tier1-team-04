import { useState, useEffect, useCallback } from "react";
import ContentGroup from "./ContentGroup";
function Content({
  tasks,
  filteredTasks,
  archiveTask,
  updateTask,
  saveData,
  cyclePriority,
  toggleCompleteTask,
  addTask,
  updateGroups,
  forceUpdate,
  setCompleteTask,
  setIncompleteTask
}) {
  filteredTasks.length > 0 && console.log(filteredTasks);
  const [groups, setGroups] = useState([
    ...new Set(filteredTasks.map((task) => task.group)),
  ]);
  console.log(groups)
  useEffect(
    () => setGroups([...new Set(filteredTasks.map((task) => task.group))]),
    [filteredTasks]
  );
  return (
    <div id="contentAnchor" className="content">
      {groups.map((group, index) => {
        const filteredTasks = tasks.filter((task) => !task.archived);
        return (
          <ContentGroup
            key={index}
            updateGroups={updateGroups}
            addTask={addTask}
            group={group}
            tasks={filteredTasks}
            updateTask={updateTask}
            archiveTask={archiveTask}
            saveData={saveData}
            cyclePriority={cyclePriority}
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

export default Content;
