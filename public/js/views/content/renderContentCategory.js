import app from "../../app.js";
import { kebabCase } from "../../utilities/utilities.js";

const renderContentCategory = (group, category) => {
  app.view.createElement(
    "div",
    `
    <div class="content-main">
        <img src="./img/Ellipse8.svg" alt="ellipse checkbox" class="ellipse" id="ellipse_${kebabCase(
          group
        )}_${kebabCase(category)}">
        <div class="content-inner">
            <div class="content-task">
                <h3 class="activity">${category}</h3> 
            </div>
            <div class="content-description">
                                      
            </div>                        
        </div>

    </div>               
`,
    document.getElementById(`content_${kebabCase(group)}`),
    `category_${kebabCase(category)}`
  );
};
export default renderContentCategory;
