import { useState, useEffect } from "react";
import ContentGroup from "./ContentGroup";
function Content({ tasks, archiveTask, updateTask, saveData, cyclePriority }) {
  const [groups, setGroups] = useState([...new Set(tasks.map((task) => task.group))]);
  useEffect(() => setGroups([...new Set(tasks.map((task) => task.group))]), [tasks]);
  return (
    <div id="contentAnchor" className="content">
      {groups.map((group, index) => {
        return (
          <ContentGroup
            key={index}
            group={group}
            tasks={tasks}
            updateTask={updateTask}
            archiveTask={archiveTask}
            saveData={saveData}
            cyclePriority={cyclePriority}
          />
        );
      })}
    </div>
  );
}

export default Content;
