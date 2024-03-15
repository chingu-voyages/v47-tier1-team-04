const toast = (message) => {
    const toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 4000);
  }
  export default toast;