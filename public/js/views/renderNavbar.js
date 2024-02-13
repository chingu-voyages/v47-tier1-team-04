import app from "../app.js";
import { renderFilteredTasks, updateContent } from "./content/renderContent.js";
const renderNavBar = () => {
  app.view.createElement(
    "nav",
    `<div class="navbar-top">
                <i class="fa-solid fa-bars menu-btn fa-2x" id="menu-btn"></i>
                <div id="date" class="date">Today:</div>
                <div class="btn-undo">
                    <a id="save-all" href="#" class="btn btn-save">Save</a>
                </div>
            </div>            
            <div class="navbtn">
                <a id="btn-day" class="btn-day">Today</a>
                <a id="btn-month" class="btn-month">Month</a>
                <a id="btn-all" class="btn-year">All</a>      
            </div>`,
    document.getElementById("app"),
    "element-el",
    "navbar"
  );
  function formatDate(date) {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  document.getElementById("btn-all").onclick = () => updateContent();
  document.getElementById("btn-month").onclick = () => {
    renderFilteredTasks(
      app.tasks.filter((task) => {
        if (typeof task.date === "undefined") return;
        return task.date.slice(0, 7) ===
          formatDate(new Date().toString().slice(0, 15)).slice(0, 7);
      })
    );
  };
  document.getElementById("btn-day").onclick = () => {
    renderFilteredTasks(
      app.tasks.filter(
        (task) => task.date === formatDate(new Date().toString().slice(0, 15))
      )
    );
  };
  app.view.createElement(
    "content",
    `<div class="content-search">
    <div class="priority">
        <a id="priority_low" class="btn btn-lite btn-blue">Low</a>
        <a id="priority_med" class="btn btn-lite btn-orange">Med</a>
        <a id="high" class="btn btn-lite btn-red">High</a>

        <div class="search">
            <input type="text" placeholder="Search by task name, category, group, etc..." id="search">
            <i class="fa-solid fa-magnifying-glass fa-lg search-icon"></i>
        </div>
    </div>               
</div>
`,
    document.getElementById("app"),
    "contentAnchor",
    "content"
  );
  document.getElementById("search").addEventListener("input", (e) => {
    let searchKey = e.target.value.toLowerCase();

    let tasks = app.tasks.filter((task) => {
      const description = (search) => {
        if (task.description) {
          return task.description.toLowerCase().includes(search);
        }
      };
      return (
        task.name.toLowerCase().includes(searchKey) ||
        description(searchKey) ||
        task.group.toLowerCase().includes(searchKey) ||
        task.category.toLowerCase().includes(searchKey) ||
        task.days.toString().toLowerCase().includes(searchKey)
      );
    });
    searchKey === ""
      ? renderFilteredTasks(app.tasks)
      : renderFilteredTasks(tasks);
  });
  document
    .getElementById("save-all")
    .addEventListener("click", app.controller.saveData);

  document.getElementById("priority_low").onclick = () =>
    renderFilteredTasks(app.tasks.filter((task) => task.priority === "3"));
  document.getElementById("priority_med").onclick = () =>
    renderFilteredTasks(app.tasks.filter((task) => task.priority === "2"));
  document.getElementById("high").onclick = () =>
    renderFilteredTasks(app.tasks.filter((task) => task.priority === "1"));
};
export default renderNavBar;
