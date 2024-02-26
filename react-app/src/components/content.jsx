import ellipse from '../images/Ellipse8.svg';
import pencil from '../images/mynaui_pencil.svg';
import trash from '../images/ph_trash.svg';

function Content () {
    return (
        <content id="content" className="content">
            <div id="content_grop" className="content-activity">
                <h2 className="group-name">group <i id="content_group_chevron_grop" className="fa-solid"></i> <i className="fa fa-solid fa-edit"></i></h2>
                <div id="category_cat">
      <div className="content-main">
          <img src={ellipse} alt="ellipse checkbox" className="ellipse" id="ellipse_grop_cat" />
          <div className="content-inner " id="">
              <div className="content-task">
                  <h3 className="activity">cat</h3><i className="fa-solid fa-pencil"></i>
                  <i className="fa-solid fa-plus add-task"></i>
              </div>
              <div className="content-description"></div>                        
          <div id="task_name" className="content-description"><p id="taskContainer_name" className="task-name"><i className="fa-regular fa-square checkbox"></i> name</p><div id="task_options_name" className="task-icons"><i className="fa fa-circle task-priority-3" aria-hidden="true"></i>
          <i className="fa-solid fa-circle-info fa-2x detail" id="view_name"></i>
          <img src={pencil} alt="edit pencil image" className="icon-update" id="edit_name" />
          <img src={trash} alt="delete trash can image" className="icon-edit" id="task_remove_name" /></div></div></div>
      </div>               
    </div></div></content>
    )
}

export default Content;