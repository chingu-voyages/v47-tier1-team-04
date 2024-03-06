import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import AddEditModal from "../Modals/AddEditTaskModal/AddEditTaskModal";

function AddTaskButton({tasks, addTask, updateGroups, saveData}) {
  const [showModal, setShowModal] = useState(false);
  const renderAddEditModal = () => {
    setShowModal(true);
  };

  const closeEditModal = () => setShowModal(false);

  return (
    <>
      <div className="add-icon" onClick={renderAddEditModal}>
        <FaPlus />
      </div>
      {showModal && <AddEditModal updateGroups={updateGroups} saveData={saveData} closeEditModal={closeEditModal} tasks={tasks} addTask={addTask} />}
    </>
  );
}

export default AddTaskButton;
