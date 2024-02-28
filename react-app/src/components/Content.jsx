import ellipse from '../images/Ellipse8.svg';
import pencil from '../images/mynaui_pencil.svg';
import trash from '../images/ph_trash.svg';
import { FaCircleInfo } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

function Content ({tasks}) {
    return (
        <div id="contentAnchor" className="content">
            <div id="content_grop" className="content-activity">
                <h2 className="group-name">{tasks[0].group} <i id="content_group_chevron_grop" className="fa-solid"></i> <FaEdit /></h2>
                <div id="category_cat">
      <div className="content-main">
          <img src={ellipse} alt="ellipse checkbox" className="ellipse" id="ellipse_grop_cat" />
          <div className="content-inner " id="">
              <div className="content-task">
                  <h3 className="activity">{tasks[0].category}</h3>
                  <FaPencil />
                  <div className='add-task'><FaPlus/></div>
              </div>
              <div className="content-description"></div>                        
          <div id="task_name" className="content-description"><p id="taskContainer_name" className="task-name"><i className="fa-regular fa-square checkbox"></i> {tasks[0].name}</p><div id="task_options_name" className="task-icons"><i className="fa fa-circle task-priority-3" aria-hidden="true"></i>
          <FaCircleInfo size={28} className='detail' id='view_name'/>
          <img src={pencil} alt="edit pencil image" className="icon-update" id="edit_name" />
          <img src={trash} alt="delete trash can image" className="icon-edit" id="task_remove_name" /></div></div></div>
      </div>               
    </div></div>
    </div>
    )
}

export default Content;
