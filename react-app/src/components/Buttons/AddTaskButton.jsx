import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import AddEditModal from "../Modals/AddTaskModal/AddEditTaskModal";

function AddTaskButton({tasks, addTask}) {
  const [showModal, setShowModal] = useState(false);

  const renderAddEditModal = () => {
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <>
      <div className="add-icon" onClick={renderAddEditModal}>
        <FaPlus />
      </div>
      {showModal && <AddEditModal closeModal={closeModal} tasks={tasks} addTask={addTask} />}
    </>
  );
}

export default AddTaskButton;
