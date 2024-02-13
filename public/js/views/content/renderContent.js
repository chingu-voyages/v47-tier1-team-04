import app from "../../app.js";
import renderFooter from "../renderFooter.js";
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
