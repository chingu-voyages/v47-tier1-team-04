import app from "../../app.js";

const renderSettings = () => {
    const settings = app.view.createElement(
        "div",
        `<div class="task-details-popup">
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
        </div>`,
        document.getElementById("app"),
        "settings-popup"
    );
    document.getElementById("close-settings-popup").onclick = () => settings.container.remove();
    document.getElementById("reset-storage").onclick = () => {app.controller.resetStorage(); settings.container.remove(); app.view.updateView();};
    document.getElementById("restore-archive").onclick = () => {app.controller.restoreArchive(); settings.container.remove(); app.view.updateView();};
    document.getElementById("reseed-data").onclick = async () => {await app.controller.seed(); settings.container.remove(); app.view.updateView();};
    document.getElementById("remove-tasks").onclick = () => {app.controller.resetState(); settings.container.remove(); app.view.updateView();};
}

export default renderSettings;