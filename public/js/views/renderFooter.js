import app from "../app.js";

const renderFooter = () => {
  app.view.createElement(
    "footer",
    `<div class="footer">
              <div class="footer-left">
                <a href="https://github.com/chingu-voyages/v47-tier1-team-04">
                  <p class="copyright">© Chingu Team 04 Github</p>
                </a>
              </div>
              
              <a href="https://www.chingu.io" class="footer-right">          
                  <p class="copyright">Chingu</p>
                  <img class="chingu-logo" src="./img/chingo-logo.png"
                    />
              </a></div>           
            `,
    document.getElementById("app"),
    "element-el",
    "footer"
  );
};

export default renderFooter;
