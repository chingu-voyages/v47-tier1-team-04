import app from "../app.js";
import renderSettings from "./utils/renderSettings.js";
import { kebabCase } from "../utilities/utilities.js";

export default class AsideViewController {
  init = (title) => {
    this.renderAsideGroups(title);
  };
  renderAside = (title = "Daily Checklist") => {
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
    ); //Creates aside element and adds the above html to display on screen and dynamically displays title
    document.getElementById("settings-icon").onclick = () => renderSettings(); //Onclick for settings-icon to run renderSettings function
    return `rendered the aside view with title ${title}`;
  };
  renderAsideGroups = (title) => {
    this.renderAside(title);
    app.controller.returnUniqueGroupNames().map((group) => {
      app.view.asideViewController.renderAsideGroup(group);
      app.controller
        .returnUniqueCategoriesByGroup(group)
        .map((category) =>
          app.view.asideViewController.renderAsideCategory(category, group)
        );
    });
    return `rendered the unique categories by group in the aside view`;
  };
  updateAsideGroups = () => {
    const aside = document.getElementById("daily-checklist"); //Finds div with "daily-checklist"
    aside.innerHTML = ""; //Here it resets to empty string
    app.controller.returnUniqueGroupNames().map((group) => {
      this.renderAsideGroup(group);
      app.controller
        .returnUniqueCategoriesByGroup(group)
        .map((category) => this.renderAsideCategory(category, group)); //Mapping over all categories and calling the renderAsideCategory()
    });
  };
  renderAsideGroup = (group) => {
    app.view.createElement(
      "div",
      `<h3>${group} <i class="fa-solid fa-circle-chevron-down"></i></h3>
                <ul id="sidebar_${kebabCase(group)}">
                    
                </ul>
              `,
      document.getElementById("daily-checklist", null, "activity")
    ); //Function gives an anchor for categories to append to
  };
  renderAsideCategory = (category, group) => {
    app.view.createElement(
      "li",
      category,
      document.getElementById(`sidebar_${kebabCase(group)}`)
    );
    return `rendered category ${category} in the aside view`;
  };
}
