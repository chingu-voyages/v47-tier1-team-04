import ContentGroup from "./ContentGroup";
function Content({ tasks }) {
  const groups = [...new Set(tasks.map((task) => task.group))]
  return (
    <div id="contentAnchor" className="content">
      {groups.map((group, index) => {
        const groupTasks = tasks.filter((task) => task.group === group);
        return <ContentGroup key={index} groupTasks={groupTasks} />;
      })}
    </div>
  );
}

export default Content;
