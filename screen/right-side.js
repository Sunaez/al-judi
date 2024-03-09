function manageJummaContent() {
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // Sunday = 0, Monday = 1, ..., Friday = 5, Saturday = 6
    const currentHour = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
  
    if (currentDay === 5 && ((currentHour === 12 && currentMinutes >= 30) || (currentHour === 13 && currentMinutes <= 15))) {
      const jummaContents = document.querySelectorAll('.Jumma-Content');
  
      jummaContents.forEach(content => {
        content.classList.add('rotating-content');
      });
    } else {
      const jummaContents = document.querySelectorAll('.Jumma-Content');
  
      jummaContents.forEach(content => {
        content.style.display = 'none';
      });
    }
  }
  
  // Call the function to manage Jumma-Content based on the time
  manageJummaContent();
  

// Function to rotate content in the right div
function rotateContent() {
    const rotatingDivs = document.querySelectorAll('.rotating-content');
    let currentIndex = 0;

    // Hide all divs except the initial one ("main")
    for (let i = 0; i < rotatingDivs.length; i++) {
        if (i !== currentIndex) {
            rotatingDivs[i].style.display = 'none';
        }
    }

    setInterval(() => {
        // Hide the current div
        rotatingDivs[currentIndex].style.display = 'none';

        // Move to the next div (loop back to the first if necessary)
        currentIndex = (currentIndex + 1) % rotatingDivs.length;

        // Show the next div
        rotatingDivs[currentIndex].style.display = 'block';
    }, 5 * 1000); // Rotate every x (* 1000) seconds
}

// Initialize the rotation functionality
rotateContent();


