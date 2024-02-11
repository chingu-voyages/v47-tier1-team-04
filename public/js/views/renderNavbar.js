import app from "../app.js";
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
  document
    .getElementById("save-all")
    .addEventListener("click", app.controller.saveData);
};
export default renderNavBar;
