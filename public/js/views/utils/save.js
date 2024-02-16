// Create a toast element
const toast = document.createElement("div");
toast.className = "toast";
document.body.appendChild(toast);

// Function to show a toast message
const renderSuccessfulSave = () => {
  toast.textContent = "Your data has been saved!";
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 4000);
};

export default renderSuccessfulSave;