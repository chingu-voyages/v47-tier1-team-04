import app from "../../app.js";
import renderTaskDetailsPopup from "./view-task.js";
import renderAddModal, { renderModalButton } from "./add-task.js";

const renderModals = () => {
  renderModalButton();
  renderAddModal();
};

export default renderModals;
