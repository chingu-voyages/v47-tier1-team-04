//import { renderModalButton } from "./add-task.js";

export const clearPopups = () => {
  let popup =
    document.querySelector(".task-details-popup") &&
    document.querySelector(".modal");
  if (popup) popup.remove();
};

const renderModals = () => {
  //renderModalButton();
};

export default renderModals;
