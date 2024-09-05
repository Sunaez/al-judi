        // JavaScript
        function getCurrentTime() {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        }

        function updateTime() {
            const timeElement = document.querySelector('.time');
            if (timeElement) {
                timeElement.textContent = getCurrentTime();
            }
        }

        // Update the time every second
        setInterval(updateTime, 1000);

        // Call the updateTime function to set the initial time immediately
        updateTime();


