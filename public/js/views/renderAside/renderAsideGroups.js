import app from "../../app.js";
import renderAsideGroup from "./renderAsideGroup.js";
import renderAside from "./renderAside.js";
import renderAsideCategory from "./renderAsideCategory.js";

export const updateAsideGroups = () => {
  const aside = document.getElementById("daily-checklist");//Finds div with "daily-checklist" 
  aside.innerHTML = "";//Here it resets to empty string
  app.controller.returnUniqueGroupNames().map((group) => {
    renderAsideGroup(group);
    app.controller
      .returnUniqueCategoriesByGroup(group)
      .map((category) => renderAsideCategory(category, group));//Mapping over all categories and calling the renderAsideCategory()
  });
};

const renderAsideGroups = (title) => {
  renderAside(title);
  app.controller.returnUniqueGroupNames().map((group) => {
    renderAsideGroup(group);
    app.controller
      .returnUniqueCategoriesByGroup(group)
      .map((category) => renderAsideCategory(category, group));
  });
};
export default renderAsideGroups;
