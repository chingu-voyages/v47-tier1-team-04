import avatar from './images/img/Friendly Ones Avatar and Backdrop.png';
import settingsicon from './images/img/solar_settings.svg';

function Aside () {
    return (
        <aside id="aside-el" className="aside">
            <div className="avatar-area">
                <div className="avatar">
                <img src={avatar} alt="avatar pict" className="avatar-pict" />
                </div>
                <div className="gear-icon">
                <img src={settingsicon} alt="gear icon" id="settings-icon" />
                </div>
            </div>            
            <h2>Daily Tasks</h2>
            <div id="daily-checklist"><div id="view_15">
            <h3 id="sidebar_group_grop"><a href="#content_grop"> grop </a><i className="fa-solid fa-circle-chevron-down"></i></h3>
            <ul id="sidebar_grop"><li id="view_16"><a href="#category_cat">cat</a></li></ul>
        </div>
        </div>
    </aside>
    )
}