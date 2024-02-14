import app from "../../app.js";
import { kebabCase } from "../../utilities/utilities.js";
const renderAsideCategory = (category, group) => {
  app.view.createElement(
    "li",
    category,
    document.getElementById(`sidebar_${kebabCase(group)}`)
  );
};
export default renderAsideCategory;
