function NavBar({ toggleDarkMode, saveApp}) {
  const toggleAside = () => {
    document.querySelector('aside').classList.toggle('collapsed');
  }
    
  return (
    <nav id="element-el" className="navbar">
      <div className="navbar">
        <div className="navbar-top">
        <i class="fa-solid fa-bars menu-btn fa-2x" onClick={() => toggleAside()}/>
          <div id="date" className="date">
            Today: {new Date().toDateString()}
          </div>
          <div className="btn-undo">
            <a
              id="mode-switch"
              href="#"
              className="btn btn-mode-switch"
              onClick={() => toggleDarkMode()}
            >
              <i class="fa-solid fa-circle-half-stroke" />
            </a>
            <a
              id="save-all"
              href="#"
              className="btn btn-save"
              onClick={() => saveApp()}
            >
              Save
            </a>
          </div>
        </div>

        <div className="navbtn">
          <a id="btn-day" className="btn btn-day">
            Today
          </a>
          <a id="btn-month" className="btn btn-month">
            Month
          </a>
          <a id="btn-all" className="btn btn-year active">
            All
          </a>
        </div>
        <div className="navday">
          <a id="btn-mon" className="btn btn-week">
            Monday
          </a>
          <a id="btn-tue" className="btn btn-week">
            Tuesday
          </a>
          <a id="btn-wed" className="btn btn-week">
            Wednesday
          </a>
          <a id="btn-thu" className="btn btn-week">
            Thursday
          </a>
          <a id="btn-fri" className="btn btn-week">
            Friday
          </a>
          <a id="btn-sat" className="btn btn-week">
            Saturday
          </a>
          <a id="btn-sun" className="btn btn-week">
            Sunday
          </a>
        </div>

        <div className="content-search">
          <div className="priority">
            <a id="priority_low" className="btn btn-lite btn-blue" href="#">
              Low
            </a>
            <a id="priority_med" className="btn btn-lite btn-orange" href="#">
              Med
            </a>
            <a id="priority_high" className="btn btn-lite btn-red" href="#">
              High
            </a>

            <div className="search">
              <input
                type="text"
                placeholder="Search by task name, category, group, etc..."
                id="search"
                className="btn"
              />
              <i class="fa-solid fa-magnifying-glass fa-lg search-icon" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
