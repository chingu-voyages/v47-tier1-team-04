import { useEffect, useState } from "react";
import formatString from "../../utils/formatString";
import defaultAvatar from "../../images/Friendly Ones Avatar and Backdrop.png";
import settingsicon from "../../images/solar_settings-linear.svg";
import Settings from "../Modals/SettingsModal/SettingsModal";
import "./Aside.styles.css";

function Aside({ title, setTitle, avatar, setAvatar, tasks }) {
  const [groups, setGroups] = useState([
    ...new Set(tasks.map((task) => task.group)),
  ]);
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
  useEffect(() => {setGroups([...new Set(tasks.map(task => task.group))])}, [tasks])
  return (
    <>
      <aside className="aside">
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
              onClick={gearIconClickHandler}
            />
          </div>
        </div>
        <h2>{title}</h2>
        <div>
          {groups.map((group, index) => (
            <AsideGroup key={index} group={group} tasks={tasks} />
          ))}
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

const AsideGroup = ({ group, tasks }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const tasksWithSameGroup = tasks.filter((task) => task.group === group);
  const categoryList = Array.from(
    new Set(tasksWithSameGroup.map((task) => task.category))
  );

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div>
      <h3>
        <a href={`#group_${formatString(group)}`}> {group} </a>
        <i
          onClick={toggleCollapse}
          className={`fa-solid fa-circle-${
            isCollapsed ? "chevron-right" : "chevron-down"
          }`}
        ></i>
      </h3>
      <AsideCategory categoryList={categoryList} isCollapsed={isCollapsed} />
    </div>
  );
};

const AsideCategory = ({ categoryList, isCollapsed }) => {
  return (
    <ul className={isCollapsed ? "hide" : null}>
      {categoryList.map((category, index) => (
        <li key={index}>
          <a href={`#category_${formatString(category)}`}>{category}</a>
        </li>
      ))}
    </ul>
  );
};
export default Aside;
