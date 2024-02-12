import renderTaskDetailsPopup from "./view-task.js";
import renderAddModal, { renderModalButton } from "./add-task.js";

const renderModals = () => {
  renderModalButton();
  renderAddModal();
  renderTaskDetailsPopup();
};

export default renderModals;
