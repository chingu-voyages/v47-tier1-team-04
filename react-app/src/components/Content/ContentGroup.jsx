import ContentCategory from "./ContentCategory";
function ContentGroup({ groupTasks }) {
  const categories = [...new Set(groupTasks.map((task) => task.category))];
  return (
    <div className="content-activity">
      {categories.map((category, index) => {
        const categoryTasks = groupTasks.filter(
          (task) => task.category === category
        );
        return <ContentCategory key={index} categoryTasks={categoryTasks} />;
      })}
    </div>
  );
}
export default ContentGroup;
