import { useState, useEffect } from "react";
import ContentGroup from "./ContentGroup";
function Content({ saveData, tasks, archiveTask, updateTask, updateGroups }) {
  const [groups, setGroups] = useState([...new Set(tasks.map((task) => task.group))]);
  useEffect(() => {
    setGroups([...new Set(tasks.map((task) => task.group))]);
  }, [tasks]);
  return (
    <div id="contentAnchor" className="content">
      {groups.map((group, index) => {
        const groupTasks = tasks.filter((task) => task.group === group);
        
        return (
          <ContentGroup
            key={index}
            groups={groups}
            updateGroups={updateGroups}
            group={group}
            groupTasks={groupTasks}
            archiveTask={archiveTask}
            tasks={tasks}
            updateTask={updateTask}
            setGroups={setGroups}
            saveData={saveData}
          />
        );
      })}
    </div>
  );
}

export default Content;
