// Function to update the date
function updateDate() {
    const dateDiv = document.getElementById('date');
    const today = new Date();
    const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
    dateDiv.textContent = `Today: ${formattedDate}`;
}

updateDate();