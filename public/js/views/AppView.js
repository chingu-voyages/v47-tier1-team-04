import app from "../app.js";
import renderTaskDetailsPopup from "./modals/addEditTask.js";

// Function to get the search bar element
const searchBar = () => document.getElementById("search");

// Function to get all button elements
const buttons = () => document.querySelectorAll(".btn");

// Function to reset the state of buttons
const resetButtons = (target) => {
  // If the target is not the search bar, clear the search bar
  if (target !== searchBar()) {
    searchBar().value = "";
    searchBar().classList.remove("active");
  }
  // Remove the 'active' class from all buttons
  buttons().forEach((ele) => {
    ele.classList.remove("active");
  });
  // Toggle the 'active' class on the target
  target.classList.toggle("active");
};

// Function to format a date into YYYY-MM-DD format
function formatDate(date) {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}
// Class definition for AppViewController
export default class AppViewController {
  // Initialize the view controller
  init(title) {
    // Initialize the aside view controller with the given title
    app.view.asideViewController.init(title);
    // Render the navigation bar
    this.renderNavBar();
    // Initialize the content view controller
    app.view.contentViewController.init();
    // Render the footer
    this.renderFooter();
    // Render the modal button
    this.renderModalButton();
  }

  // Update the application view
  updateApp() {
    // Update the aside view
    app.view.asideViewController.updateAside();
    // Update the content tasks
    app.view.contentViewController.updateContentTasks();
  }

  // Remove the popup
  removePopup() {
    // Get the popup element
    const popup = document.querySelector(".task-details-popup");
    // If the popup exists, remove it
    if (popup) {
      popup.remove();
    }
  }

  // Render the modal button
  renderModalButton() {
    // Create a new div element with the 'add-icon' class and an onclick event to render the task details popup
    app.view.createElement(
      "div",
      '<i class="fa-solid fa-plus add-icon"></i>',
      document.getElementById("app"),
      "add-icon-el",
      "fa-solid fa-plus add-icon"
    );

    // Add an onclick event to the 'add-icon' element to render the task details popup
    document.querySelector(".add-icon").onclick = () =>
      renderTaskDetailsPopup();
  }

  // Render the navigation bar
  renderNavBar() {
    // Create the navigation bar
    this.createNavBar();
    // Add a listener to the menu button
    this.addMenuButtonListener();
    // Add listeners to the week buttons
    this.addWeekButtonListeners();
    // Add a listener to the 'All' button
    this.addAllButtonListener();
    // Add a listener to the 'Month' button
    this.addMonthButtonListener();
    // Add a listener to the 'Day' button
    this.addDayButtonListener();
    // Create the content
    this.createContent();
    // Add a listener to the search bar
    this.addSearchBarListener();
    // Add a listener to the 'Save All' button
    this.addSaveAllButtonListener();
    // Add listeners to the priority buttons
    this.addPriorityButtonListeners();
    // Add listener to darkMode switch button
    document
      .getElementById("mode-switch")
      .addEventListener("click", this.toggleDarkModeView);
  }

  // Function to create the navigation bar
  createNavBar() {
    const navbarTop = this.createNavbarTop();
    const navbtn = this.createNavbtn();
    const navdays = this.createNavdays();

    const navbarHTML = `<div class="navbar">${navbarTop}${navbtn}${navdays}</div>`;

    app.view.createElement(
      "nav",
      navbarHTML,
      document.getElementById("app"),
      "element-el",
      "navbar"
    );
  }

  createNavbarTop() {
    return `
      <div class="navbar-top">
        <i class="fa-solid fa-bars menu-btn fa-2x" id="menu-btn"></i>
        <div id="date" class="date">Today: ${new Date().toLocaleDateString()}</div>
        <div class="btn-undo">
          <a id="mode-switch" href="#" class="btn btn-mode-switch"><i class="fa-solid fa-circle-half-stroke"></i></a>
          <a id="save-all" href="#" class="btn btn-save">Save</a>
        </div>
      </div>
    `;
  }

  createNavbtn() {
    return `
      <div class="navbtn">
        <a id="btn-day" class="btn btn-day">Today</a>
        <a id="btn-month" class="btn btn-month">Month</a>
        <a id="btn-all" class="btn btn-year active">All</a>  
      </div>
    `;
  }
  createNavdays() {
    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    // Map each day of the week to a button
    const navdayHTML = daysOfWeek
      .map((day) => {
        const btnId = `btn-${day.toLowerCase().substring(0, 3)}`;
        return `<a id="${btnId}" class="btn btn-week">${day}</a>`;
      })
      .join("");

    // Return the complete navigation bar
    return `<div class="navday">${navdayHTML}</div>`;
  }
  toggleDarkModeView() {
    app.controller.toggleDarkMode();
    document.body.classList.toggle("dark-mode");
  }
  // Function to filter tasks based on a condition
  filterTasks(tasks) {
    // Filter the tasks based on the provided condition
    let temp = app.tasks;
    app.tasks = app.tasks.filter(tasks);
    // Update the content view with the filtered tasks
    app.view.contentViewController.updateContentTasks();
    app.tasks = temp;
  }

  // Function to filter tasks by date
  filterTasksByDate(days) {
    // Get the current date
    const today = new Date();
    // Calculate the future date by adding the specified number of days to the current date
    const futureDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + days
    );
    // Filter the tasks based on the date
    filterTasks((task) => {
      // Convert the task date to a Date object
      const taskDate = new Date(task.date);
      console.log(taskDate);
      // Return true if the task date is between today and the future date
      return taskDate >= today && taskDate < futureDate;
    });
  }

  // Function to add a listener to the menu button
  addMenuButtonListener() {
    // Get the menu button element
    const menuBtn = document.getElementById("menu-btn");
    // Get the aside element
    const asideEl = document.getElementById("aside-el");
    // Add a click event listener to the menu button
    menuBtn.addEventListener("click", function () {
      // Toggle the display of the aside element
      asideEl.style.display =
        asideEl.style.display === "none" || asideEl.style.display === ""
          ? "block"
          : "none";
    });
  }

  // Function to add event listeners to the week buttons
  addWeekButtonListeners() {
    // Select all week buttons and loop through them
    document.querySelectorAll(".btn.btn-week").forEach((btn) =>
      // Add a click event listener to each button
      btn.addEventListener("click", (e) => {
        // Reset the state of all buttons
        resetButtons(e.target);
        // Get the day of the week from the button's innerHTML
        const today = e.target.innerHTML;
        // Filter tasks to only include tasks for the selected day of the week
        let temp = app.tasks;
        app.tasks = app.tasks.filter((task) => task.days.includes(today));
        app.view.contentViewController.updateContentTasks();
        app.tasks = temp;
      })
    );
  }

  // Function to add an event listener to the 'All' button
  addAllButtonListener() {
    // Get the 'All' button and add a click event listener
    document.getElementById("btn-all").addEventListener("click", (e) => {
      // Reset the state of all buttons
      resetButtons(e.target);
      // Show all tasks
      this.filterTasks(() => true);
    });
  }

  // Function to add an event listener to the 'Month' button
  addMonthButtonListener() {
    // Get the 'Month' button and add a click event listener
    document.getElementById("btn-month").addEventListener("click", (e) => {
      // Reset the state of all buttons
      resetButtons(e.target);
      // Get the current date
      const today = new Date();
      // Calculate the date one month from now
      const nextMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        today.getDate()
      );
      // Filter tasks to only include tasks for the next month
      this.filterTasks((task) => {
        const taskDate = new Date(task.date);
        return taskDate >= today && taskDate < nextMonth;
      });
    });
  }

  // Function to add an event listener to the 'Day' button
  addDayButtonListener() {
    // Get the 'Day' button and add a click event listener
    document.getElementById("btn-day").addEventListener("click", (e) => {
      // Reset the state of all buttons
      resetButtons(e.target);
      // Get the current date formatted as YYYY-MM-DD
      const today = formatDate(new Date());
      // Filter tasks to only include tasks for today
      this.filterTasks(task => {
        const taskDate = task.date;
        return taskDate === today;
      })
    });
  }

  // Function to create the content area
  createContent() {
    // Create a new content element with the specified HTML and append it to the 'app' element
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
  }

  // Function to add an event listener to the search bar
  addSearchBarListener() {
    // Get the search bar and add an input event listener
    searchBar().addEventListener("input", (e) => {
      // Get the search key from the search bar's value
      let searchKey = e.target.value.toLowerCase();
      // Reset the state of all buttons
      resetButtons(searchBar());
      // Filter tasks based on the search key
      let tasks = app.tasks.filter((task) => {
        // Helper function to check if the task description includes the search key
        const description = (search) => {
          if (task.description) {
            return task.description.toLowerCase().includes(search);
          }
        };
        // Return true if any of the task's properties include the search key
        return (
          task.name.toLowerCase().includes(searchKey) ||
          description(searchKey) ||
          task.group.toLowerCase().includes(searchKey) ||
          task.category.toLowerCase().includes(searchKey) ||
          task.days.toString().toLowerCase().includes(searchKey)
        );
      });
      // If the search key is empty, update the content view with all tasks
      if (searchKey === "") app.contentViewController.updateContentTasks();
      else {
        // Otherwise, update the content view with the filtered tasks
        let temp = app.tasks;
        app.tasks = tasks;
        app.view.contentViewController.updateContentTasks();
        // Restore the original tasks
        app.tasks = temp;
      }
    });
  }
  // Function to add an event listener to the 'Save All' button
  addSaveAllButtonListener() {
    // Get the 'Save All' button and add a click event listener
    // The listener calls the 'saveData' method of the app controller when the button is clicked
    document
      .getElementById("save-all")
      .addEventListener("click", app.controller.saveData);
  }

  // Function to add event listeners to the priority buttons
  addPriorityButtonListeners() {
    // Get the 'Low Priority' button and add a click event listener
    document.getElementById("priority_low").onclick = (e) => {
      // Reset the state of all buttons
      resetButtons(e.target);
      // Update the content view to only show tasks with low priority
      app.view.contentViewController.updateContentTasks(
        app.tasks.filter((task) => task.priority == 3)
      );
    };
    // Get the 'Medium Priority' button and add a click event listener
    document.getElementById("priority_med").onclick = (e) => {
      // Reset the state of all buttons
      resetButtons(e.target);
      // Update the content view to only show tasks with medium priority
      app.view.contentViewController.updateContentTasks(
        app.tasks.filter((task) => task.priority == 2)
      );
    };
    // Get the 'High Priority' button and add a click event listener
    document.getElementById("priority_high").onclick = (e) => {
      // Reset the state of all buttons
      resetButtons(e.target);
      // Update the content view to only show tasks with high priority
      app.view.contentViewController.updateContentTasks(
        app.tasks.filter((task) => task.priority == 1)
      );
    };
  }
  // Function to render the footer
  renderFooter() {
    // Define the HTML for the footer
    const footerHTML = `
    <a href="https://www.chingu.io" class="footer-top" target="_blank">
    <img class="chingu-logo" src="./img/chingo-logo.png">        
    <p class="copyright">Chingu Voyage 47</p>
  </a>
  <div class="footer-bottom">
    <a href="https://github.com/chingu-voyages/v47-tier1-team-04" target="_blank">
      <p class="copyright"><i class="fa-brands fa-github fa-xl"></i> Team 04 Github &copy; ${new Date().getFullYear()}</p>
    </a>

    <class="github-buttons">

        <a class="github-button" href="https://github.com/chingu-voyages/v47-tier1-team-04/subscription" data-color-scheme="no-preference: light; light: light; dark: light;" data-icon="octicon-eye" data-show-count="true" aria-label="Watch chingu-voyages/v47-tier1-team-04 on GitHub">Watch</a>

        <a class="github-button" href="https://github.com/chingu-voyages/v47-tier1-team-04" data-color-scheme="no-preference: light; light: light; dark: light;" data-icon="octicon-star" data-show-count="true" aria-label="Star chingu-voyages/v47-tier1-team-04 on GitHub">Star</a>

        <a class="github-button" href="https://github.com/chingu-voyages/v47-tier1-team-04/fork" data-color-scheme="no-preference: light; light: light; dark: light;" data-icon="octicon-repo-forked" data-show-count="true" aria-label="Fork chingu-voyages/v47-tier1-team-04 on GitHub">Fork</a>

        <a class="github-button" href="https://github.com/chingu-voyages/v47-tier1-team-04/issues" data-color-scheme="no-preference: light; light: light; dark: light;" data-icon="octicon-issue-opened" data-show-count="true" aria-label="Issue chingu-voyages/v47-tier1-team-04 on GitHub">Issue</a>
    </div>
  </div>
`;

    // Create a new footer element with the specified HTML and append it to the 'app' element
    app.view.createElement(
      "footer",
      footerHTML,
      document.getElementById("app"),
      "element-el",
      "footer"
    );
    this.loadGithubButtons();
  }
  loadGithubButtons() {
    const script = document.createElement("script");
    script.src = "https://buttons.github.io/buttons.js";
    script.async = true;
    document.body.appendChild(script);
  }
}
