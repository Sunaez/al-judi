function getCurrentMonthCSV() {
    const today = new Date();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    const csvFileName = `times_${mm}.${yyyy}.csv`;
    return csvFileName;
}

fetch(`../${getCurrentMonthCSV()}`) // Assuming the CSV files are in the parent directory
    .then(response => response.text())
    .then(csvContents => {
        filterByToday(csvContents);
    })
    .catch(error => {
        console.error('Error fetching or parsing CSV:', error);
    });

function parseCSV(csv) {
    const rows = csv.split('\n');
    const table = document.createElement('table');

    for (let i = 0; i < rows.length; i++) {
        const row = document.createElement('tr');
        const columns = rows[i].split(',');

        for (let j = 0; j < columns.length; j++) {
            const cell = i === 0 ? document.createElement('th') : document.createElement('td');
            cell.textContent = columns[j];
            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    const csvTableContainer = document.getElementById('csvTableContainer');
    csvTableContainer.innerHTML = ''; // Clear previous content
    csvTableContainer.appendChild(table);
}


function filterByToday(csv) {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    const formattedToday = dd + '/' + mm + '/' + yyyy;

    const matchingRow = csv.split('\n').find(row => {
        const rowData = row.split(',');
        // Assuming the date is in the first column (index 0).
        return rowData[0].trim() === formattedToday;
    });

    if (matchingRow) {
        const rowData = matchingRow.split(',');
        document.getElementById('FajrTime').textContent = rowData[2]; // Fajr Jamaat
        document.getElementById('DhuhrTime').textContent = rowData[4]; // Dhuhr Jamaat
        document.getElementById('AsrTime').textContent = rowData[6];  // Asr Jamaat
        document.getElementById('MaghribTime').textContent = rowData[7]; // Maghrib (Regular time)
        document.getElementById('IshaTime').textContent = rowData[8];  // Isha (Regular time)

        // Calculate time until next prayer
        const currentHour = today.getHours();
        const currentMinute = today.getMinutes();
        const nextPrayerTimes = [
            { time: rowData[2], name: 'Fajr Jamaat' },
            { time: rowData[4], name: 'Dhuhr Jamaat' },
            { time: rowData[6], name: 'Asr Jamaat' },
            { time: rowData[7], name: 'Maghrib (Regular time)' },
            { time: rowData[8], name: 'Isha (Regular time)' }
        ];

        let nextPrayer = null;
        for (let i = 0; i < nextPrayerTimes.length; i++) {
            const prayerTime = nextPrayerTimes[i].time.split(':');
            const prayerHour = parseInt(prayerTime[0]);
            const prayerMinute = parseInt(prayerTime[1]);

            if (
                (prayerHour > currentHour) ||
                (prayerHour === currentHour && prayerMinute > currentMinute)
            ) {
                nextPrayer = nextPrayerTimes[i];
                break;
            }
        }

        if (nextPrayer) {
            const prayerTime = nextPrayer.time.split(':');
            const prayerHour = parseInt(prayerTime[0]);
            const prayerMinute = parseInt(prayerTime[1]);
            const timeUntilNextPrayer = ((prayerHour - currentHour) * 60 + prayerMinute - currentMinute);

            const countdownElement = document.getElementById('countdownDiv');
            const urgentOverlay = document.getElementById('urgent');

            if (timeUntilNextPrayer <= 1) {
                // If there's a minute or less left, display countdown in seconds
                const timeUntilNextPrayerSeconds = timeUntilNextPrayer * 60;
                countdownElement.textContent = `${timeUntilNextPrayerSeconds} seconds until ${nextPrayer.name}`;
                urgentOverlay.style.display = 'block'; // Show the overlay
            } else {
                countdownElement.textContent = `${timeUntilNextPrayer} minutes until ${nextPrayer.name}`;
                urgentOverlay.style.display = 'none'; // Hide the overlay
            }
        } else {
            const countdownElement = document.getElementById('countdownDiv');
            const urgentOverlay = document.getElementById('urgent');
            countdownElement.textContent = 'No upcoming prayer today.';
            urgentOverlay.style.display = 'none'; // Hide the overlay
        }
    } else {
        const csvTableContainer = document.getElementById('csvTableContainer');
        csvTableContainer.innerHTML = 'No matching data for today.';
    }
}

function updateCountdown() {
    fetch(`../${getCurrentMonthCSV()}`)
        .then(response => response.text())
        .then(csvContents => {
            filterByToday(csvContents);
        })
        .catch(error => {
            console.error('Error fetching or parsing CSV:', error);
        });
}

// Call updateCountdown every second (1000 milliseconds)
setInterval(updateCountdown, 1000);

// Initial call to updateCountdown
updateCountdown();
