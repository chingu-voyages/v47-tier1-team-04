import app from "../../app.js";
const renderAsideCategory = (category, group) => {
  app.view.createElement(
    "li",
    category,
    document.getElementById(`sidebar_${group}`)
  );
};
export default renderAsideCategory;
