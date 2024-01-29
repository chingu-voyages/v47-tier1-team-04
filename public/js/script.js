// Function to fetch data from Json file:
const fetchJsonFile = async function() {
    try {
      const response = await fetch('https://raw.githubusercontent.com/chingu-voyages/voyage-project-tier1-dailytasks/main/assets/tasks-example.json');
      const data = await response.json();
      
      console.log("Fetched Data:", data);
      return data;
    } catch (error) {
      console.error('Error loading JSON:', error);
      throw error;
    }
  };

  fetchJsonFile();
  

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

// Complete task checkoff
const ellipses = document.querySelectorAll('.ellipse');

ellipses.forEach(ellipse => {   
    ellipse.addEventListener('click', function() {
        console.log("clicked ellipse");
        
        const contentMainDiv = this.closest('.content-main');
        
        const contentInnerDiv = contentMainDiv.querySelector('.content-inner');
        
        contentInnerDiv.classList.toggle('darken');
        
        if (this.src.includes("Ellipse8.svg")) {
            this.src = "./img/favicon.png";
            this.style.width = '55px';
            this.style.height = '55px';
            this.parentElement.style.display = 'flex';
            this.parentElement.style.justifyContent = 'center';
            this.parentElement.style.alignItems = 'center';
        } else {
            this.src = "./img/Ellipse8.svg";
        }
    });
});