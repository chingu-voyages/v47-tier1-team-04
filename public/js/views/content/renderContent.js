import app from "../../app.js";
import renderContentGroups from "./renderContentGroups.js";
import renderContentTasks from "./renderContentTasks.js";

const renderContent = () => {
  if (!document.getElementById("contentAnchor")) {
    app.view.createElement(
      "content",
      `<div class="content-search">
      <div class="priority">
          <a href="#" class="btn btn-lite btn-blue">Low</a>
          <a href="#" class="btn btn-lite btn-orange">Med</a>
          <a href="#" class="btn btn-lite btn-red">High</a>

          <div class="search">
              <input type="text" placeholder="Search for your task..." id="search">
              <i class="fa-solid fa-magnifying-glass fa-lg search-icon"></i>
          </div>
      </div>               
  </div>
  `,
      document.getElementById("app"),
      "contentAnchor",
      "content"
    );
  }
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

const renderFilteredTasks = (tasks) => {
  let temp = app.tasks;
  app.tasks = tasks;
  updateContent();
  app.tasks = temp;
};



export default renderContent;
