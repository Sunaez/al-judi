// Function to refresh the page
function refreshPage() {
    // Refresh the page
location.reload(true);
}

// Set a timer to refresh the page every hour
setInterval(refreshPage, 60 * 60 * 1000); // 1 hour (60min * 60sec * 1000ms)
