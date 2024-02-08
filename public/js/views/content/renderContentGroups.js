import app from '../../app.js';
import renderContentGroup from './renderContentGroup.js';
import renderContentCategory from './renderContentCategory.js';

const renderContentGroups = () => {
    app.controller.returnUniqueGroupNames().map((group) => {
      renderContentGroup(group);
      app.controller
        .returnUniqueCategoriesByGroup(group)
        .map((category) => renderContentCategory(group, category));
    });
  }
  export default renderContentGroups