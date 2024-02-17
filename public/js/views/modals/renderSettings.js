// Import the main app module
import app from "../../app.js";

// Define the HTML template for the settings
const settingsTemplate = `
  <div class="task-details-popup">
    <div class="settings-content">
      <div class="settings-content-top">
          <h2>Settings</h2>
          <i class="fa-solid fa-xmark fa-2x close-settings-popup close-settings-icon" id="close-settings-popup"></i>
      </div>
      <div class="settings-group">
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
    settingsTemplate,
    document.getElementById("app"),
    "settings-popup"
  );

  // Add event listeners to the settings buttons
  addEventListener("close-settings-popup", () => settings.container.remove());
  addEventListener("reset-storage", () => {
    localStorage.clear();
    app.controller.resetState();
    removeSettingsAndRefresh(settings);
  });
  addEventListener("restore-archive", () => {
    app.controller.restoreArchivedTasks();
    removeSettingsAndRefresh(settings);
  });
  addEventListener("reseed-data", async () => {
    await app.controller.seed();
    removeSettingsAndRefresh(settings);
  });
  addEventListener("remove-tasks", () => {
    app.controller.resetState();
    removeSettingsAndRefresh(settings);
  });
};

// Export the renderSettings function
export default renderSettings;