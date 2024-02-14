import app from "../app.js";
import { renderFilteredTasks, updateContent } from "./content/renderContent.js";
const renderNavBar = () => {
  app.view.createElement(
    "nav",
    `<div class="navbar-top">
                <i class="fa-solid fa-bars menu-btn fa-2x" id="menu-btn"></i>
                <div id="date" class="date">Today: ${new Date().toLocaleDateString()}</div>
                <div class="btn-undo">
                    <a id="save-all" href="#" class="btn btn-save">Save</a>
                </div>
            </div>            
            <div class="navbtn">
                <a id="btn-day" class="btn btn-day">Today</a>
                <a id="btn-month" class="btn btn-month">Month</a>
                <a id="btn-all" class="btn btn-year active">All</a>  
            </div>
            <div class="navday">
                <a id="btn-mon" class="btn btn-week">Monday</a>
                <a id="btn-tue" class="btn btn-week">Tuesday</a>
                <a id="btn-wed" class="btn btn-week">Wednesday</a> 
                <a id="btn-thur" class="btn btn-week">Thursday</a>      
                <a id="btn-fri" class="btn btn-week">Friday</a>  
                <a id="btn-sat" class="btn btn-week">Saturday</a>  
                <a id="btn-sun" class="btn btn-week">Sunday</a>  
            </div>
            `,
    document.getElementById("app"),
    "element-el",
    "navbar"
  );
  app.filteredTasks = app.tasks;

  document.querySelectorAll(".btn.btn-week").forEach((ele) => {
    ele.onclick = (e) => {
      resetButtons(e.target);
      renderFilteredTasks(
        app.tasks.filter((task) => task.days.includes(e.target.innerHTML))
      );
    };
  });
  function formatDate(date) {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  document.getElementById("btn-all").onclick = (e) => {
    resetButtons(e.target);
    updateContent(app.tasks);
  };
  document.getElementById("btn-month").onclick = (e) => {
    resetButtons(e.target);
    renderFilteredTasks(
      app.tasks.filter((task) => {
        if (typeof task.date === "undefined") return;
        return (
          task.date.slice(0, 7) ===
          formatDate(new Date().toString().slice(0, 15)).slice(0, 7)
        );
      })
    );
  };
  document.getElementById("btn-day").onclick = (e) => {
    resetButtons(e.target);
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
        <a id="priority_high" class="btn btn-lite btn-red">High</a>

        <div class="search">
            <input type="text" placeholder="Search by task name, category, group, etc..." id="search" class="btn">
            <i class="fa-solid fa-magnifying-glass fa-lg search-icon"></i>
        </div>
    </div>               
</div>
`,
    document.getElementById("app"),
    "contentAnchor",
    "content"
  );
  const searchBar = document.getElementById("search");
  const buttons = document.querySelectorAll(".btn");
  const resetButtons = (target) => {
    if (target !== searchBar) {
      searchBar.value = "";
      searchBar.classList.remove("active");
    }
    buttons.forEach((ele) => {
      ele.classList.remove("active");
    });
    target.classList.toggle("active");
  };
  searchBar.addEventListener("input", (e) => {
    let searchKey = e.target.value.toLowerCase();
    resetButtons(searchBar);
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

  document.getElementById("priority_low").onclick = (e) => {
    resetButtons(e.target);
    renderFilteredTasks(app.tasks.filter((task) => task.priority == 3));
  };
  document.getElementById("priority_med").onclick = (e) => {
    resetButtons(e.target);
    renderFilteredTasks(app.tasks.filter((task) => task.priority == 2));
  };
  document.getElementById("priority_high").onclick = (e) => {
    resetButtons(e.target);
    renderFilteredTasks(app.tasks.filter((task) => task.priority == 1));
  };
};
export default renderNavBar;
