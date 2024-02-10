import app from "../../app.js";
import renderContentGroups from "./renderContentGroups.js";
import renderContentTasks from "./renderContentTasks.js";

const renderContent = () => {
  app.view.createElement(
    "content",
    `<div class="content-search">
      <div class="priority">
          <a href="#" class="btn btn-lite btn-blue">Low</a>
          <a href="#" class="btn btn-lite btn-orange">Med</a>
          <a href="#" class="btn btn-lite btn-red">High</a>

          <div class="search">
              <input type="text" placeholder="">
              <i class="fa-solid fa-magnifying-glass fa-lg search-icon"></i>
          </div>
      </div>               
  </div>
  `,
    document.getElementById("app"),
    "content",
    "content"
  );
  renderContentGroups();
  renderContentTasks();

};

export const updateContent = () => {
  document.getElementById("content").remove();
  renderContent();
}

export default renderContent;
