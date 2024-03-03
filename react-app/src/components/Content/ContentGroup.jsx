import formatString from "../../utils/formatString";
import ContentCategory from "./ContentCategory";
function ContentGroup({ groupTasks }) {
  const categories = [...new Set(groupTasks.map((task) => task.category))];
  const groupTask = groupTasks[0].group;
  return (
    <div className="content-activity" id={`group_${formatString(groupTask)}`}>
      <h2 class="group-name">{groupTask} <i className="fa-solid"></i> <i className="fa fa-solid fa-edit"></i></h2>
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
