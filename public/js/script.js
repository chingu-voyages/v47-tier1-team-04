// Function to update the date
function updateDate() {
    const dateDiv = document.getElementById('date');
    const today = new Date();
    const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
    dateDiv.textContent = `Today: ${formattedDate}`;
}

updateDate();

// Hamburger Menu Display on Mobile
document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.querySelector('.menu-btn');
    const asideEl = document.getElementById('aside-el');

    menuBtn.addEventListener('click', function () {
        asideEl.style.display = (asideEl.style.display === 'none' || asideEl.style.display === '') ? 'block' : 'none';
    });
})
