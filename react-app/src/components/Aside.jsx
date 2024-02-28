import { useEffect, useState } from "react";
import defaultAvatar from "../images/Friendly Ones Avatar and Backdrop.png";
import settingsicon from "../images/solar_settings-linear.svg";
import Settings from "./SettingsModal";

function Aside({ title, setTitle, avatar, setAvatar, groups, tasks }) {
  const [showModal, setShowModal] = useState(false);
  const gearIconClickHandler = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const getGithubData = async (username) =>
    await fetch(`https://api.github.com/users/${username}`)
      .then((data) => data.json())
      .then((json) => json); // function to fetch a github user profile and return it
  const getAvatarUrl = async () => {
    if (avatar) {
      const data = await getGithubData(avatar);
      setAvatarUrl(data.avatar_url);
    }
  };
  useEffect(() => {
    getAvatarUrl();
  });
  return (
    <>
      <aside id="aside-el" className="aside">
        <div className="avatar-area">
          <div className="avatar">
            <img
              src={avatar ? avatarUrl : defaultAvatar}
              alt="avatar pict"
              className="avatar-pict"
            />
          </div>
          <div className="gear-icon">
            <img
              src={settingsicon}
              alt="gear icon"
              id="settings-icon"
              onClick={gearIconClickHandler}
            />
          </div>
        </div>
        <h2>{title}</h2>
        <div id="daily-checklist">
          {
                    groups.map(group => (
                        <AsideGroup group = {group} tasks = {tasks}/>
                    ))
                }
        </div>
      </aside>
      {showModal && (
        <Settings
          closeModal={closeModal}
          title={title}
          setTitle={setTitle}
          avatar={avatar}
          setAvatar={setAvatar}
        />
      )}
    </>
  );
}


const AsideGroup = ({group, tasks}) => {
    const tasksWithSameGroup = 
        tasks.filter(task => ( 
            (task.group === group)
        ))
    const cateogryList = new Set(tasksWithSameGroup.map(task => task.category))
return (
    <div>
            <h3>
                <a href="#"> {group} </a>
                <i className="fa-solid fa-circle-chevron-down"></i>
            </h3>
            <AsideCategory categoryList={Array.from(cateogryList)}/>
        </div>
)
}

const AsideCategory = ({categoryList}) => {
    return (
        <ul id="sidebar_grop">
        {
            categoryList.map(category => (
                <li id="view_16"><a href="#category_cat">{category}</a></li>    
            ))
        }
        </ul>
    )
}
export default Aside;
