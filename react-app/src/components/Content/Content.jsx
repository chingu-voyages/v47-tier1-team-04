import { useState, useEffect, useCallback } from "react";
import ContentGroup from "./ContentGroup";
function Content({
  tasks,
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
  const [groups, setGroups] = useState([
    ...new Set(tasks.map((task) => task.group)),
  ]);

  useEffect(
    () => setGroups([...new Set(tasks.map((task) => task.group))]),
    [tasks]
  );
  return (
    <div id="contentAnchor" className="content">
      {groups.map((group, index) => {
        return (
          <ContentGroup
            key={index}
            updateGroups={updateGroups}
            addTask={addTask}
            group={group}
            tasks={tasks}
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
