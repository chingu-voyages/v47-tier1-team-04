import app from "../app.js";
import { renderModalButton } from "./modals/add-edit-task.js";

export default class AppViewController {
  init(title) {
    app.view.asideViewController.init(title);
    this.renderNavBar();
    app.view.contentViewController.init();
    this.renderFooter();
    this.renderModalButton();
  }
  updateApp() {
    app.view.asideViewController.updateAside();
    app.view.contentViewController.updateContentTasks();
  }
  removePopup() {
    let popup = document.querySelector(".task-details-popup");

    if (popup) {
      popup.remove();
    }
  }
  renderNavBar() {
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
    const menuBtn = document.getElementById("menu-btn");
    const asideEl = document.getElementById("aside-el");

    menuBtn.addEventListener("click", function () {
      asideEl.style.display =
        asideEl.style.display === "none" || asideEl.style.display === ""
          ? "block"
          : "none";
    });

    document.querySelectorAll(".btn.btn-week").forEach((ele) => {
      ele.onclick = (e) => {
        resetButtons(e.target);
        app.view.taskViewController.renderContentTasks(
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
      app.view.taskViewController.renderContentTasks();
    };
    document.getElementById("btn-month").onclick = (e) => {
      resetButtons(e.target);
      app.view.taskViewController.renderContentTasks(
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
      app.view.taskViewController.renderContentTasks(
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
        ? app.view.taskViewController.renderContentTasks()
        : app.view.taskViewController.renderContentTasks(tasks);
    });
    document
      .getElementById("save-all")
      .addEventListener("click", app.controller.saveData);

    document.getElementById("priority_low").onclick = (e) => {
      resetButtons(e.target);
      app.view.taskViewController.renderContentTasks(app.tasks.filter((task) => task.priority == 3));
    };
    document.getElementById("priority_med").onclick = (e) => {
      resetButtons(e.target);
      app.view.taskViewController.clear
      app.view.taskViewController.renderContentTasks(app.tasks.filter((task) => task.priority == 2));
    };
    document.getElementById("priority_high").onclick = (e) => {
      resetButtons(e.target);
      app.view.taskViewController.renderContentTasks(app.tasks.filter((task) => task.priority == 1));
    };
  }
  renderFooter() {
    app.view.createElement(
      "footer",
      `<div class="footer">
                  <div class="footer-left">
                    <a href="https://github.com/chingu-voyages/v47-tier1-team-04">
                      <p class="copyright">© Chingu Team 04 Github</p>
                    </a>
                  </div>
                  
                  <a href="https://www.chingu.io" class="footer-right">          
                      <p class="copyright">Chingu</p>
                      <img class="chingu-logo" src="./img/chingo-logo.png"
                        />
                  </a></div>           
                `,
      document.getElementById("app"),
      "element-el",
      "footer"
    );
  }
  renderModalButton = renderModalButton;
}
