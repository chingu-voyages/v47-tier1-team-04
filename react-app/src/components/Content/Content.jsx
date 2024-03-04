import ContentGroup from "./ContentGroup";
function Content({ tasks, archiveTask, updateTask}) {
  const groups = [...new Set(tasks.map((task) => task.group))]
  return (
    <div id="contentAnchor" className="content">
      {groups.map((group, index) => {
        const groupTasks = tasks.filter((task) => task.group === group);
        return <ContentGroup key={index} groupTasks={groupTasks} archiveTask={archiveTask} tasks={tasks} updateTask={updateTask} />;
      })}
    </div>
  );
}

export default Content;
