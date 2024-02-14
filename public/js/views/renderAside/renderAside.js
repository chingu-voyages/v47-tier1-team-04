import app from "../../app.js";
import renderSettings from "../utils/renderSettings.js";
export const renderAside = (title) => {
  app.view.createElement(
    "aside",
    ` <div class="avatar-area">
            <div class="avatar">
                <img src="./img/Friendly Ones Avatar and Backdrop.png" alt="avatar pict">
            </div>
            <div class="gear-icon">
                <img src="./img/solar_settings-linear.svg" alt="gear icon" id="settings-icon">
            </div>
        </div>            
        <h2>${title}</h2>
            <div id="daily-checklist">
            </div>`,
    document.getElementById("app"),
    "element-el",
    "aside"
  );
  document.getElementById("settings-icon").onclick = () => renderSettings();
};
export default renderAside;
