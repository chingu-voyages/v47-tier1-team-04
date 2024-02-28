import defaultAvatar from "../images/Friendly Ones Avatar and Backdrop.png";
import settingsicon from "../images/solar_settings-linear.svg";
import { useEffect, useState } from "react";
import Settings from "./SettingsModal";

function Aside({ title, setTitle, avatar, setAvatar }) {
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
              src={
                avatar
                  ? avatarUrl
                  : defaultAvatar
              }
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
          <div id="view_15">
            <h3 id="sidebar_group_grop">
              <a href="#content_grop"> grop </a>
              <i className="fa-solid fa-circle-chevron-down"></i>
            </h3>
            <ul id="sidebar_grop">
              <li id="view_16">
                <a href="#category_cat">cat</a>
              </li>
            </ul>
          </div>
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

export default Aside;
