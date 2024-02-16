// Import the main app module
import app from "../../app.js";

// Define the HTML template for the settings
const settingsTemplate = `
  <div class="task-details-popup">
    <div class="settings-content">
      <i class="fa-solid fa-xmark fa-2x close-settings-popup" id="close-settings-popup"></i>
      <h2>Settings</h2>
      <div class="settings-group">
        <div class="settings">
          <label for="reset-storage">Reset Local Storage:</label>
          <input type="button" id="reset-storage" name="reset-storage" value="reset" class="btn btn-lite active">
        </div>
        <div class="settings">
          <label for="restore-archive">Restore Archive:</label>
          <input type="button" id="restore-archive" name="restore-archive" value="restore" class="btn btn-lite active">
        </div>
        <div class="settings">
          <label for="reseed-data">Reseed Data:</label>
          <input type="button" id="reseed-data" name="reseed-data" value="reseed" class="btn btn-lite active">
        </div>
        <div class="settings">
          <label for="remove-tasks">Remove Tasks:</label>
          <input type="button" id="remove-tasks" name="remove-tasks" value="remove" class="btn btn-lite active">
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