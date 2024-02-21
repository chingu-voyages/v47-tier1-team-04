// Import the main app module
import app from "../../app.js";

// Define the HTML template for the settings
const settingsTemplate = () => `
  <div class="task-details-popup">
    <div class="settings-content">
      <div class="settings-content-top">
          <h2>Settings</h2>
          <i class="fa-solid fa-xmark fa-2x close-settings-popup close-settings-icon" id="close-settings-popup"></i>
      </div>
      <div class="settings-group">
      <div class="settings">
      <label for="newTitle">Change Title:</label>
          <input id="newTitle" type="text" value="${app.state.title}">
          <input value="Submit" type="button" id="changeTitle">
        </div>
        <div class="settings">
        <label for="avatarImg">Change Avatar (input Github Username):</label>
          <input value="${app.state.gitHubData && app.state.gitHubData.login}" id="avatar" type="text"><input value="Submit" type="button" id="changeAvatar">
        </div>
        <div class="settings">
          <input type="button" id="reset-storage" name="reset-storage" value="Reset Local Storage" class="btn btn-settings setting-active">
        </div>
        <div class="settings">
          <input type="button" id="restore-archive" name="restore-archive" value="Restore Archive" class="btn btn-settings setting-active">
        </div>
        <div class="settings">
          <input type="button" id="reseed-data" name="reseed-data" value="Reseed Data" class="btn btn-settings setting-active">
        </div>
        <div class="settings">
          <input type="button" id="remove-tasks" name="remove-tasks" value="Remove Tasks" class="btn btn-settings setting-active">
        </div>
      </div>
    </div>
  </div>
`;

// Function to add an event listener to an element with a given id
const addEventListener = (id, callback) => {
  document.getElementById(id).onclick = callback;
};

// Function to remove the settings and refresh the app view
const removeSettingsAndRefresh = (settings) => {
  settings.container.remove();
  app.view.appViewController.updateApp();
};

// Function to render the settings
const renderSettings = () => {
  // Create the settings element
  app.view.appViewController.removePopup();
  const settings = app.view.createElement(
    "div",
    settingsTemplate(),
    document.getElementById("app"),
    "settings-popup"
  );

  // Add event listeners to the settings buttons
  addEventListener("close-settings-popup", () => settings.container.remove());
  addEventListener("changeTitle", () => {
    app.state.title = document.getElementById("newTitle").value;
    removeSettingsAndRefresh(settings);
  });
  addEventListener("reset-storage", async () => {
    if (
      window.confirm(
        "WARNING: This will clear all application data and reload it with a new reseed. This cannot be undone."
      )
    ) {
      localStorage.clear();
      app.resetState();
      app.view.container.innerHTML = "";
      const title = window.prompt("What is the title of your app?");
      const github = window.prompt("What is your GitHub username?");
      await app.init(title);
      app.state.gitHubData = await getGithubData(github);
      removeSettingsAndRefresh(settings);
    }
  });
  addEventListener("restore-archive", () => {
    if (
      window.confirm(
        'WARNING: This will populate your rendered tasks with previously "trashed" / "archived" tasks. This can only be undone by immediately refreshing the page.'
      )
    ) {
      app.controller.restoreArchivedTasks();
      removeSettingsAndRefresh(settings);
    }
  });
  addEventListener("reseed-data", async () => {
    if (
      window.confirm(
        "WARNING: This will potentially duplicate or add unwanted data to your data. This can only be undone by immediately refreshing the page."
      )
    ) {
      await app.controller.seed();

      removeSettingsAndRefresh(settings);
    }
  });
  addEventListener("remove-tasks", () => {
    if (
      window.confirm(
        "WARNING: This will clear all of your tasks allowing you to start fresh This can only be undone by immediately refreshing the page."
      )
    ) {
      app.controller.resetState();
      removeSettingsAndRefresh(settings);
    }
  });
  addEventListener("changeAvatar", async () => {
    const gitHubUrl = document.getElementById("avatar").value;
    const gitHubData = await getGithubData(gitHubUrl);
    app.state.gitHubData = gitHubData;
    removeSettingsAndRefresh(settings);
  });
};
const getGithubData = async (username) =>
  await fetch(`https://api.github.com/users/${username}`)
    .then((data) => data.json())
    .then((json) => json); // function to fetch a github user profile and return it

// Export the renderSettings function
export default renderSettings;
