import app from "../../app.js";
import { kebabCase } from "../../utilities/utilities.js";
import renderTaskDetailsPopup from "../modals/add-edit-task.js";
import Task from "../../utilities/task.js";

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

                <i class="fa-solid fa-plus add-task"></i>

            </div>
            <div class="content-description">
                                      
            </div>                        
        </div>

    </div>               
`,
    document.getElementById(`content_${kebabCase(group)}`),
    `category_${kebabCase(category)}`
  );

  document.querySelectorAll(".add-task").forEach(ele => {
    ele.onclick = (e) => {
      ele.style.display = 'none';
      const category = e.target.previousElementSibling.innerHTML;
      const group = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.firstChild.innerHTML;
      const inputElement = document.createElement("input");
      inputElement.placeholder = "enter quick task here";
      inputElement.setAttribute("type", "text");
      inputElement.setAttribute("class", "add-task-input");
      ele.parentElement.appendChild(inputElement);
      inputElement.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
          const task = {"name": inputElement.value, "group": group, "category": category, "days": new Array(), "description": ""};
          new Task(task);
          inputElement.style.display = 'none';
          ele.style.display = 'inline';
          app.view.updateView();  
        }
    });
    }
  });
  document.getElementById(
    `ellipse_${kebabCase(group)}_${kebabCase(category)}`
  ).onclick = () => {
    app.controller.toggleCategory(group, category);
  };
};
export default renderContentCategory;
