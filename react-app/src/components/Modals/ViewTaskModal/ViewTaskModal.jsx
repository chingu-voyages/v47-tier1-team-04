function ViewTaskModal({closeModal}){
        return (
                <div id="view-task-details-popup" className="task-details-popup">
                    <div className="task-details-popup">
                        <div className="task-details-content">
                        <i class="fa-solid fa-xmark fa-2x close-details-popup" onClick={() => closeModal()} />
                            <label style={{textAlign: 'left'}}>Priority:</label>
                            <a href="#" className="btn btn-lite btn-blue">Low</a>
                            <h2>Task Details</h2>
                            <div className="task-details-group border-shadow">
                                <div className="task-details">
                                    <label>Group:</label>
                                    <h3>grop</h3>
                                </div>
                                <div className="task-details">
                                    <label>Category:</label>
                                    <h4>cat</h4>
                                </div>
                            </div>
                            <div className="task-details-group border-shadow">
                                <div className="task-details border-shadow-sub">
                                    <label>Name:</label>
                                    <p>name</p>
                                </div>
                            </div>
                            <div className="task-details-group border-shadow-sub">
                                <div className="task-details">
                                    <label>No Frequency Set</label>
                                    <p>&nbsp;</p>
                                </div>
                                <div className="task-details">
                                    <label>No Days Selected</label>
                                    <p>&nbsp;</p>
                                </div>
                                <div className="task-details">
                                    <label>No Due Date</label>
                                    <p>&nbsp;</p>
                                </div>
                            </div>
                            <a className="btn btn-save btn-detail item-center close" id="close-task-details">Close</a>
                        </div>
                    </div>
                </div>
        )
}

export default ViewTaskModal;