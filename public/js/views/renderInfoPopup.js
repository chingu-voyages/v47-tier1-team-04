import app from "../script.js";
const renderInfoPopup = () => {
    console.log('hello')
  const detailsPopup = app.view.createElement(
    "div",
    `<!-- Details popup window -->
        <div class="task-details-content">
            <span class="close-details-popup"><i class="fa-solid fa-xmark fa-2x"></i></span>
            <h2>Task Details</h2>
            <div class="task-details">
                <label for="task-name">Task Name:</label>
                <input type="text" id="task-name" name="task-name">
            </div>
            <div class="task-details">
                <label for="category-name">Category Name:</label>
                <input type="text" id="category-name" name="category-name">
            </div>
            <div class="task-details">
                <label for="task-description">Description:</label>
                <textarea id="task-description" name="task-description"></textarea>
            </div>
            <div class="task-details">
                <label for="task-frequency">Frequency:</label>
                <input type="text" id="task-frequency" name="task-frequency">
            </div>
            <div class="task-details">
                <label for="task-days">Days:</label>
                <input type="text" id="task-days" name="task-days">
            </div>
            <div class="task-details">
                <label for="task-priority">Priority:</label>
                <select id="task-priority" name="task-priority">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>                
                <a href="#" class="btn btn-save btn-detail" id="save-task-details">Save</a>               
        </div>
    </div>
`,
    document.getElementById('app'),
    null,
    "task-details-popup"
  );
  detailsPopup.style = "display: none";
};
export default renderInfoPopup;