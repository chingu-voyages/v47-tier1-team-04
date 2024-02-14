import app from "../../app.js";
import renderSettings from "../utils/renderSettings.js";
export const renderAside = (title = "Daily Checklist") => {
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
    "aside-el",
    "aside"
  );//Creates aside element and adds the above html to display on screen and dynamically displays title
  document.getElementById("settings-icon").onclick = () => renderSettings(); //Onclick for settings-icon to run renderSettings function
};
export default renderAside;
