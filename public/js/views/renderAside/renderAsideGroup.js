import app from '../../app.js';
const renderAsideGroup = (group) => {
    app.view.createElement(
      "div",
      ` 
              <h3>${group} <i class="fa-solid fa-circle-chevron-down"></i></h3>
              <ul id="sidebar_${group}">
                  
              </ul>
            `,
      document.getElementById("daily-checklist", null, "activity")
    );
  }

  export default renderAsideGroup