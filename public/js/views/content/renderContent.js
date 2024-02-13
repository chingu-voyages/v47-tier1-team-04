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
  let temp = app.tasks;
  app.tasks = tasks;
  
  app.tasks = temp;
  const searchField =  document.getElementById("search");
  app.searchField = searchField.value;
  updateContent();
  searchField.value = "";
  
  setTimeout(() => searchField.value = app.searchField, 50)
};



export default renderContent;
