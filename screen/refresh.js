// Function to refresh the page
function refreshPage() {
    // Refresh the page
location.reload(true);
}

// Set a timer to refresh the page every hour
setInterval(refreshPage, 60 * 60 * 1000); // 60 minutes * 60 seconds * 1000 milliseconds
