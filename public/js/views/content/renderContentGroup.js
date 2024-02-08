import app from "../../app.js"
import { kebabCase } from "../../utilities/utilities.js";

export const renderContentGroup = (group) => {
    app.view.createElement(
      "div",
      `<h2 class="category-name">${group}</h2>`,
      document.getElementById("content"),
      `content_${kebabCase(group)}`,
      "content-activity"
    );
  }
  export default renderContentGroup