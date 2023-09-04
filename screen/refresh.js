// Function to refresh the page
function refreshPage() {
    window.location.reload(true);
}

// Function to execute the jummah.php script
function executeJummahScript() {
    var currentDayOfWeek = new Date().getDay(); // Get the current day of the week (0-6)

    // Check if the current day is Friday (5)
    if (currentDayOfWeek === 5) {
        // Load and execute jummah.php using AJAX
        $.ajax({
            url: 'jummah.php',
            type: 'GET',
            success: function(response) {
                $('#content').html(response);
            }
        });
    }
}

// Set a timer to refresh the page every hour
setInterval(refreshPage, 60 * 60 * 1000); // 60 minutes * 60 seconds * 1000 milliseconds

// Set a timer to execute the jummah.php script every second
setInterval(executeJummahScript, 1000); // 1 minute * 60 seconds * 1000 milliseconds