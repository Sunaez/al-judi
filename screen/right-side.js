// Function to rotate content in the right div
function rotateContent() {
    const rotatingDivs = document.querySelectorAll('.rotating-content');
    let currentIndex = 0;
    setInterval(() => {
        // Hide the current div
        rotatingDivs[currentIndex].style.display = 'none';

        // Move to the next div (loop back to the first if necessary)
        currentIndex = (currentIndex + 1) % rotatingDivs.length;

        // Show the next div
        rotatingDivs[currentIndex].style.display = 'block';
    }, 30 * 1000); // Rotate every 30 seconds
}

// Function to update countdown timer
function updateCountdown(prayerTime, countdownElement) {
    setInterval(() => {
        const now = new Date();
        const timeUntilPrayer = prayerTime - now;

        if (timeUntilPrayer > 0) {
            const minutes = Math.floor(timeUntilPrayer / 60000);
            const seconds = Math.floor((timeUntilPrayer % 60000) / 1000);
            countdownElement.textContent = `${minutes}m ${seconds}s until prayer`;
        } else {
            countdownElement.textContent = 'Prayer in progress';
        }
    }, 1000); // Update countdown every second
}

// Function to indicate prayers in progress
function indicatePrayersInProgress() {
    const now = new Date();
    const prayerTimes = [
        // Replace these with the actual prayer times for your location
        new Date(), // Fajr
        new Date(), // Dhuhr
        new Date(), // Asr
        new Date(), // Maghrib
        new Date(), // Isha
    ];

    // Check if any prayer is in progress
    for (let i = 0; i < prayerTimes.length; i++) {
        if (now >= prayerTimes[i] && now < prayerTimes[i + 1]) {
            const prayerInProgressDiv = document.getElementById('prayerProgressDiv');
            prayerInProgressDiv.textContent = `${getPrayerName(i)} in progress`;
            break;
        }
    }
}

// Helper function to get the name of the prayer based on its index
function getPrayerName(index) {
    const prayerNames = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    return prayerNames[index];
}

// Initialize the rotation and other functionality
rotateContent();
indicatePrayersInProgress();
