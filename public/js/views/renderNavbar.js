import app from "../app.js";
import { renderFilteredTasks } from "./content/renderContent.js";
const renderNavBar = () => {
  app.view.createElement(
    "nav",
    `<div class="navbar-top">
                <i class="fa-solid fa-bars menu-btn fa-2x" id="menu-btn"></i>
                <div id="date" class="date">Today:</div>
                <div class="btn-undo">
                    <button class="btn undo">
                        <img src="./img/ci_undo.svg" alt="undo button">
                        undo
                    </button>
                    <button class="btn undo">
                        <img src="./img/ci_redo.svg" alt="redo button">
                        redo
                    </button>
                    <a id="save-all" href="#" class="btn btn-save">Save</a>
                </div>
            </div>            
            <div class="navbtn">
                <a href="#" class="btn-day">Today</a>
                <a href="#" class="btn-month">Month</a>
                <a href="#" class="btn-year">Year</a>      
            </div>`,
    document.getElementById("app"),
    "element-el",
    "navbar"
  );
  app.view.createElement(
    "content",
    `<div class="content-search">
    <div class="priority">
        <a href="#" class="btn btn-lite btn-blue">Low</a>
        <a href="#" class="btn btn-lite btn-orange">Med</a>
        <a href="#" class="btn btn-lite btn-red">High</a>

        <div class="search">
            <input type="text" placeholder="Search for a task by name..." id="search">
            <i class="fa-solid fa-magnifying-glass fa-lg search-icon"></i>
        </div>
    </div>               
</div>
`,
    document.getElementById("app"),
    "contentAnchor",
    "content"
  );
  document.getElementById("search").addEventListener("keyup", (e) => {
    let searchKey = e.target.value;

    let tasks = app.tasks.filter(
      (task) =>
        task.name.includes(searchKey) 
    );
    searchKey === ""
      ? renderFilteredTasks(app.tasks)
      : renderFilteredTasks(tasks);
  });
  document
    .getElementById("save-all")
    .addEventListener("click", app.controller.saveData);
};
export default renderNavBar;
