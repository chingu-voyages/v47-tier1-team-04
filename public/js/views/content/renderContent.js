import app from "../../app.js";
import renderContentGroups from "./renderContentGroups.js";
import renderContentTasks from "./renderContentTasks.js";

const renderContent = () => {
  app.view.createElement(
    "content",
    "",
    document.getElementById("contentAnchor"),
    "content",
    "content"
  );
  renderContentGroups();
  renderContentTasks();
  document.getElementById("search").addEventListener("keyup", (e) => {
    let searchKey = e.target.value;
    let tasks = app.tasks.filter((obj) =>
      Object.keys(obj).some((key) => obj[key].includes(searchKey))
    );
    searchKey === ""
      ? renderFilteredTasks(app.tasks)
      : renderFilteredTasks(tasks);
    renderFilteredTasks(tasks);
  });
};

export const updateContent = () => {
  document.getElementById("content").remove();
  renderContent();
};

export const renderFilteredTasks = (tasks) => {
  let temp = app.tasks;
  app.tasks = tasks;
  updateContent();
  app.tasks = temp;
};



export default renderContent;
