import GitHubButton from "react-github-btn";
import chinguLogo from "../../images/chingo-logo.png";

function Footer() {
  return (
    <footer id="element-el" className="footer">
      <a href="https://www.chingu.io" className="footer-top" target="_blank">
        <img className="chingu-logo" src={chinguLogo} alt="Chingu Logo" />
        <p className="copyright">Chingu Voyage 47</p>
      </a>
      <div className="footer-bottom">
        <a
          href="https://github.com/chingu-voyages/v47-tier1-team-04"
          target="_blank"
        >
          <p className="github-link">
          <i class="fa-brands fa-github fa-xl" />Team 04 Github ©{" "}
            {new Date().getFullYear()}
          </p>
        </a>
        <div className="github-buttons">
          <GitHubButton
            href="https://github.com/chingu-voyages/v47-tier1-team-04/subscription"
            data-color-scheme="no-preference: light; light: light; dark: dark;"
            data-icon="octicon-eye"
            data-show-count="true"
            aria-label="Watch chingu-voyages/v47-tier1-team-04 on GitHub"
          >
            Watch
          </GitHubButton>
          <GitHubButton
            href="https://github.com/chingu-voyages/v47-tier1-team-04/subscription"
            data-color-scheme="no-preference: light; light: light; dark: dark;"
            data-icon="octicon-eye"
            data-show-count="true"
            aria-label="Watch chingu-voyages/v47-tier1-team-04 on GitHub"
          >
            Watch
          </GitHubButton>
          <GitHubButton
            href="https://github.com/chingu-voyages/v47-tier1-team-04/fork"
            data-color-scheme="no-preference: light; light: light; dark: dark;"
            data-icon="octicon-repo-forked"
            data-show-count="true"
            aria-label="Fork chingu-voyages/v47-tier1-team-04 on GitHub"
          >
            Fork
          </GitHubButton>
          <GitHubButton
            href="https://github.com/chingu-voyages/v47-tier1-team-04/issues"
            data-color-scheme="no-preference: light; light: light; dark: dark;"
            data-icon="octicon-issue-opened"
            data-show-count="true"
            aria-label="Issue chingu-voyages/v47-tier1-team-04 on GitHub"
          >
            Issue
          </GitHubButton>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
