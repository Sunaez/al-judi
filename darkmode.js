document.addEventListener('DOMContentLoaded', function () {
    updateTheme();

    function updateTheme() {
        const currentHour = new Date().getHours();
        const currentMinute = new Date().getMinutes();
        const isDaytime = isDaytimeFromCSV();

        const rootElement = document.documentElement;
        rootElement.setAttribute('data-theme', isDaytime ? 'light' : 'dark');

        // Change background image based on the time of the day
        const backgroundImage = isDaytime ? 'bg.jpg' : 'bg-inv.jpg';
        document.getElementsByClassName('topnav')[0].style.backgroundImage = `url(${backgroundImage})`;
    }

    function isDaytimeFromCSV() {
        const currentDate = new Date();
        const currentDay = currentDate.getDay();
        const currentHour = currentDate.getHours();
        const currentMinute = currentDate.getMinutes();

        // Replace 'YOUR_CSV_FILE_URL' with the actual URL of your hosted CSV file
        fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQfoFEcprp-CYQjw40GrjdNWToUSvv10TjQzpw30vPkpLdwLz5NSeKKhNlsseeAkWR5wBAZLnzNpDcq/pub?output=csv')
            .then(response => response.text())
            .then(csvData => {
                const csvArray = csvData.split('\n');
                const headers = csvArray[0].split(',');

                const sunriseIndex = headers.indexOf('Sunrise');
                const maghribIndex = headers.indexOf('Maghrib');
                
                // Splitting and parsing the HH:MM time format
                const sunriseTimeParts = csvArray[currentDay + 1].split(',')[sunriseIndex].split(':');
                const maghribTimeParts = csvArray[currentDay + 1].split(',')[maghribIndex].split(':');

                // Extracting hours and minutes
                const sunriseHour = parseInt(sunriseTimeParts[0]);
                const sunriseMinute = parseInt(sunriseTimeParts[1]);
                const maghribHour = parseInt(maghribTimeParts[0]) + 12;
                const maghribMinute = parseInt(maghribTimeParts[1]);

                // Checking if it's daytime
                const isDaytime = (currentHour > sunriseHour ||
                                   (currentHour === sunriseHour && currentMinute >= sunriseMinute)) &&
                                  (currentHour < maghribHour ||
                                   (currentHour === maghribHour && currentMinute < maghribMinute));

                const rootElement = document.documentElement;
                rootElement.setAttribute('data-theme', isDaytime ? 'light' : 'dark');

                // Change background image based on the time of the day
                const backgroundImage = isDaytime ? 'bg.jpg' : 'bg-inv.jpg';
                document.getElementsByClassName('topnav')[0].style.backgroundImage = `url(${backgroundImage})`;
            })
            .catch(error => {
                console.error('Error fetching CSV file:', error);
                // Handle error appropriately, fallback to a default mode perhaps
            });
    }

    // Check the theme immediately and do not set any interval
});