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
};

export const updateContent = () => {
  document.getElementById("content").remove();
  
  renderContent();
};

export const renderFilteredTasks = (tasks) => {
  const searchField =  document.getElementById("search");
  let temp = app.tasks;
  app.tasks = tasks;
  app.searchField = searchField.value;
  //document.getElementById("search").value = '';
  app.tasks = temp;
  updateContent();
};



export default renderContent;
