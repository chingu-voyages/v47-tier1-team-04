import { FaWindowClose } from "react-icons/fa";

const Settings = ({closeModal}) => {
  {console.log('is it coming here:' + closeModal)}
  
  return (
    <div id="settings-popup">
<div class="task-details-popup">
    <div class="settings-content">
      <div class="settings-content-top">
          <h2>Settings</h2>
          <i class="fa-solid fa-xmark fa-2x close-settings-popup close-settings-icon" id="close-settings-popup"></i>
          <FaWindowClose onClick={() => closeModal()} className="fa-solid fa-xmark fa-2x close-details-popup" />

      </div>
      <div class="settings-group">
      <div class="settings">
        <div class="settings-changes">
            <label for="newTitle">Change Title:</label>
            <div class="settings-changes-inputs">
              <input id="newTitle" type="text" value="Daily Tasks" />
              <input value="Submit" type="button" id="changeTitle" class="change-input-btn mr-l-10" />
            </div>
          </div>
        </div>

        <div class="settings">
          <div class="settings-changes">
            <label for="avatarImg">Change Avatar (input Github Username):</label>
            <div class="settings-changes-inputs">
              <input value="undefined" id="avatar" type="text" /><input value="Submit" type="button" id="changeAvatar" class="change-input-btn" />
            </div>
          </div>
        </div>

        <div class="settings">
          <input type="button" id="reset-storage" name="reset-storage" value="Reset Local Storage" class="btn btn-settings setting-active" />
        </div>

        <div class="settings">
          <input type="button" id="restore-archive" name="restore-archive" value="Restore Archive" class="btn btn-settings setting-active" />
        </div>

        <div class="settings">
          <input type="button" id="reseed-data" name="reseed-data" value="Reseed Data" class="btn btn-settings setting-active" />
        </div>

        <div class="settings">
          <input type="button" id="remove-tasks" name="remove-tasks" value="Remove Tasks" class="btn btn-settings setting-active" />
        </div>
      </div>
    </div>
  </div>
  </div>
  )
}

export default Settings;