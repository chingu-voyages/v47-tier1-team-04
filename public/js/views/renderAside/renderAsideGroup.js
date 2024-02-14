import app from "../../app.js";
import { kebabCase } from "../../utilities/utilities.js";
const renderAsideGroup = (group) => {
  app.view.createElement(
    "div",
    `<h3>${group} <i class="fa-solid fa-circle-chevron-down"></i></h3>
              <ul id="sidebar_${kebabCase(group)}">
                  
              </ul>
            `,
    document.getElementById("daily-checklist", null, "activity")
  );//Function gives an anchor for categories to append to
};

export default renderAsideGroup;
