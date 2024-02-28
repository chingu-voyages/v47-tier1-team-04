import avatar from '../images/Friendly Ones Avatar and Backdrop.png';
import settingsicon from '../images/solar_settings-linear.svg';
import { useState } from "react";
import Settings from './SettingsModal';

function Aside ({groups, tasks}) {
    const [showModal, setShowModal] = useState(false);

    function gearIconClickHandler(){
        setShowModal(true);
    }

    const closeModal = () => setShowModal(false);

    return (
        <>
        <aside id="aside-el" className="aside">
            <div className="avatar-area">
                <div className="avatar">
                <img src={avatar} alt="avatar pict" className="avatar-pict" />
                </div>
                <div className="gear-icon">
                <img src={settingsicon} alt="gear icon" id="settings-icon" onClick={gearIconClickHandler}/>
                

                </div>
            </div>            
            <h2>Daily Tasks</h2>
            <div id="daily-checklist">
                {
                    groups.map(group => (
                        <AsideGroup group = {group} tasks = {tasks}/>
                    ))
                }
        </div>
    </aside>
    {showModal && <Settings closeModal={closeModal} />}
    </>
    )
}


const AsideGroup = ({group, tasks}) => {
    const tasksWithSameGroup = 
        tasks.filter(task => ( 
            (task.group === group)
        ))
    const cateogryList = new Set(tasksWithSameGroup.map(task => task.category))
return (
    <div id="view_15">
            <h3 id="sidebar_group_grop">
                <a href="#content_grop"> {group} </a>
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
