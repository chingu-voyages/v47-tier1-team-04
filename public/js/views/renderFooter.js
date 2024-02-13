import app from "../app.js";
// import { renderModal } from "./everythingElse.temp.js";
// (() => {
//   const thisButton = app.view.createElement(
//     "div",
//     '<i class="fa-solid fa-plus add-icon"></i>',
//     document.getElementById("app"),
//     "add-icon-el",
//     "fa-solid fa-plus add-icon"
//   );
//   renderModal();
//   thisButton.onclick = () => (addButton.style.display = "block");
// })();

const renderFooter = () => {
  app.view.createElement(
    "footer",
    `<footer>
              <div class="footer-left">
                <a href="https://github.com/chingu-voyages/v47-tier1-team-04">
                  <p class="copyright">© Chingu Team 04 Github</p>
                </a>
              </div>
              
              <a href="https://www.chingu.io" class="footer-right">          
                  <p class="copyright">Chingu</p>
                  <img class="chingu-logo" src="./img/chingo-logo.png"
                    />
              </a>            
            </footer> `,
    document.getElementById("app"),
    "element-el",
    "footer"
  );
};

export default renderFooter;
