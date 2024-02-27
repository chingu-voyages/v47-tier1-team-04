import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import AddEditModal from "./AddEditTaskModal";

function AddTaskButton() {
  const [showModal, setShowModal] = useState(false);

  const renderAddEditModal = () => {
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <>
      <div className="fa fa-plus add-icon" onClick={renderAddEditModal}>
        <FaPlus />
      </div>
      {showModal && <AddEditModal closeModal={closeModal} />}
    </>
  );
}

export default AddTaskButton;
