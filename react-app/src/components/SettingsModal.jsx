import { useState } from "react";

const Settings = ({ closeModal, title, setTitle, avatar, setAvatar }) => {
  const [newTitle, setNewTitle] = useState(title);
  console.log({title, setTitle, avatar, setAvatar})
  const [newAvatar, setNewAvatar] = useState(avatar);
  const changeTitle = () => {
    setTitle(newTitle);
    closeModal();
  };
  const changeAvatar = async () => {
    setAvatar(newAvatar);
    closeModal();
  };

  return (
    <div id="settings-popup">
      <div className="task-details-popup">
        <div className="settings-content">
          <div className="settings-content-top">
            <h2>Settings</h2>
            <i
              className="fa-solid fa-xmark fa-2x close-settings-popup close-settings-icon"
              id="close-settings-popup" onClick={() => closeModal()}
            />
    
          </div>
          <div className="settings-group">
            <div className="settings">
              <div className="settings-changes">
                <label htmlFor="newTitle">Change Title:</label>
                <div className="settings-changes-inputs">
                  <input
                    id="newTitle"
                    type="text"
                    defaultValue={title}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                  <input
                    value="Submit"
                    type="button"
                    id="changeTitle"
                    className="change-input-btn mr-l-10"
                    onClick={() => changeTitle()}
                  />
                </div>
              </div>
            </div>

            <div className="settings">
              <div className="settings-changes">
                <label htmlFor="avatarImg">
                  Change Avatar (input Github Username):
                </label>
                <div className="settings-changes-inputs">
                  <input
                    defaultValue={avatar}
                    id="avatar"
                    type="text"
                    onChange={(e) => setNewAvatar(e.target.value)}
                  />
                  <input
                    value="Submit"
                    type="button"
                    id="changeAvatar"
                    className="change-input-btn"
                    onClick={() => changeAvatar()}
                  />
                </div>
              </div>
            </div>

            <div className="settings">
              <input
                type="button"
                id="reset-storage"
                name="reset-storage"
                value="Reset Local Storage"
                className="btn btn-settings setting-active"
              />
            </div>

            <div className="settings">
              <input
                type="button"
                id="restore-archive"
                name="restore-archive"
                value="Restore Archive"
                className="btn btn-settings setting-active"
              />
            </div>

            <div className="settings">
              <input
                type="button"
                id="reseed-data"
                name="reseed-data"
                value="Reseed Data"
                className="btn btn-settings setting-active"
              />
            </div>

            <div className="settings">
              <input
                type="button"
                id="remove-tasks"
                name="remove-tasks"
                value="Remove Tasks"
                className="btn btn-settings setting-active"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
