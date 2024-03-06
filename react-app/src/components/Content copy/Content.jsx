import { useState, useEffect } from "react";
import ContentGroup from "./ContentGroup";
function Content({ saveData, tasks, archiveTask, updateTask, updateGroups }) {
  const groups = [...new Set(tasks.map((task) => task.group))];
  return (
    <div id="contentAnchor" className="content">
      {[...new Set(tasks.map(task => task.group))].map((group, index) => {
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
            saveData={saveData}
          />
        );
      })}
    </div>
  );
}

export default Content;
