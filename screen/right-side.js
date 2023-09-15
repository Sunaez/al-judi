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
    }, 45 * 1000); // Rotate every x (* 1000) seconds
}

// Initialize the rotation functionality
rotateContent();
