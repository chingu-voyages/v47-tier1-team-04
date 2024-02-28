import ContentCategory from "./ContentCategory";
function ContentGroup({ tasks }) {
  const categories = [...new Set(tasks.map((task) => task.category))];
  return (
    <div className="content-activity">
      {categories.map((category, index) => {
        const categoryTasks = tasks.filter(
          (task) => task.category === category
        );
        return <ContentCategory key={index} tasks={categoryTasks} />;
      })}
    </div>
  );
}
export default ContentGroup;
