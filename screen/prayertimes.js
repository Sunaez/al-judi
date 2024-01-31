function getCurrentMonthCSV() {
    return 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQfoFEcprp-CYQjw40GrjdNWToUSvv10TjQzpw30vPkpLdwLz5NSeKKhNlsseeAkWR5wBAZLnzNpDcq/pub?output=csv';
}

fetch(`${getCurrentMonthCSV()}`) // Assuming the CSV files are in the parent directory
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
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const formattedToday = `${dd}/${mm}/${yyyy}`;

    const matchingRow = csv.split('\n').find(row => {
        const rowData = row.split(',');
        return rowData[0].trim() === formattedToday;
    });

    if (matchingRow) {
        const rowData = matchingRow.split(',');
        document.getElementById('FajrTime').textContent = rowData[2]; // Fajr Jamaat
        document.getElementById('DhuhrTime').textContent = rowData[5]; // Dhuhr Jamaat
        document.getElementById('AsrTime').textContent = rowData[7];  // Asr Jamaat
        document.getElementById('MaghribTime').textContent = rowData[8]; // Maghrib (Regular time)
        document.getElementById('IshaTime').textContent = rowData[10];  // Isha (Regular time)

        // Calculate time until next prayer
        const currentHour = today.getHours();
        const currentMinute = today.getMinutes();
        const nextPrayerTimes = [
            { time: rowData[2], name: 'Fajr' },
            { time: rowData[5], name: 'Dhuhr' },
            { time: rowData[7], name: 'Asr' },
            { time: rowData[8], name: 'Maghrib' },
            { time: rowData[10], name: 'Isha' }
        ];

        let nextPrayer = null;
        for (let i = 0; i < nextPrayerTimes.length; i++) {
            const prayerTime = nextPrayerTimes[i].time.split(':');
            const prayerHour = parseInt(prayerTime[0]);
            const prayerMinute = parseInt(prayerTime[1]);

            if (
                (prayerHour > currentHour) ||
                (prayerHour === currentHour && prayerMinute >= currentMinute)
            ) {
                nextPrayer = nextPrayerTimes[i];
                break;
            }
        }


        const prayerTime = nextPrayer.time.split(':');
        const prayerHour = parseInt(prayerTime[0]);
        const prayerMinute = parseInt(prayerTime[1]);
        const MinutesLeft = ((prayerHour - currentHour) * 60 + prayerMinute - currentMinute);

        const prayername = nextPrayer.name;
        const countdownElement = document.getElementById('countdownDiv');
        const urgentOverlay = document.getElementById('urgent');
        const prayerIP = document.getElementById('prayerInProgressDiv');

        console.log(MinutesLeft)
        if (nextPrayer) {
            if (MinutesLeft < 1) {
                setInterval(() => {
                    if (wasPrayer) {
                        console.log('MinutesLeft > 1: wasPrayer is true');
                        // Show the urgent overlay and prayer in progress
                        urgentOverlay.style.display = 'block';
                        prayerIP.style.display = 'block';
                        countdownElement.style.display = 'none';
                    }
                    if (!wasPrayer) {
                        console.log('MinutesLeft > 1: wasPrayer is false');
                        urgentOverlay.style.display = 'none';
                        prayerIP.style.display = 'none';
                        countdownElement.style.display = 'none';
                    }
                }, 1000);
            }
            if (MinutesLeft === 1) {
                console.log('MinutesLeft === 1');
                urgentOverlay.style.display = 'block';
                prayerIP.style.display = 'none';
                countdownElement.style.display = 'block';
                // Execute this code once to set the prayer name

                // Run this code every second to update the countdown
                setInterval(() => {
                    const secondsRemaining = 60 - (Math.floor(Date.now() / 1000) % 60);
                    countdownElement.textContent = `${secondsRemaining} seconds until ${nextPrayer.name}`;
                    prayerIP.textContent = `Current prayer: ${prayername}`;
                }, 1000);
            } else if (MinutesLeft === 0) {
                console.log('MinutesLeft === 0');
                // Run setWasPrayerTrueForTenMinutes function
                setWasPrayerTrueForTenMinutes();
                // Show the urgent overlay and prayer in progress
                urgentOverlay.style.display = 'block';
                prayerIP.style.display = 'block';
                countdownElement.style.display = 'none';
            }
        }
        if (nextPrayer === null) {
            if (wasPrayer) {
                console.log(' wasPrayer is true');
                // Show the urgent overlay and prayer in progress
                urgentOverlay.style.display = 'block';
                prayerIP.style.display = 'block';
                countdownElement.style.display = 'none';
            } else {
                console.log(' wasPrayer is false');
                urgentOverlay.style.display = 'none';
                prayerIP.style.display = 'none';
                countdownElement.style.display = 'none';
            }
        }
    }
}
function onMinuteChange(callback) {
    let previousMinute = new Date().getMinutes(); // Get the current minute

    setInterval(() => {
        const currentMinute = new Date().getMinutes(); // Get the current minute

        if (currentMinute !== previousMinute) {
            console.log(`Minute changed: Previous Minute: ${previousMinute}, Current Minute: ${currentMinute}`);
            // Minute has changed, call the callback function
            callback();

            // Update the previous minute
            previousMinute = currentMinute;
        }
    }, 1000); // Check every second
}

onMinuteChange(() => {
    console.log('Running updateCountdown at the start.');
    // Run the updateCountdown function each time there's a new minute
    updateCountdown();
});

let wasPrayer = false;



function setWasPrayerTrueForTenMinutes() {
    wasPrayer = true;

    let secondsLeft = 3 * 60; // Initial seconds left

    // Set a timer to set wasPrayer back to false after 3 minutes
    const timer = setInterval(function () {
        secondsLeft -= 1; // Decrement the seconds left
        console.log(`Seconds left until wasPrayer is set to false: ${secondsLeft}`);

        if (secondsLeft <= 0) {
            wasPrayer = false;
            console.log('wasPrayer set to false');
            clearInterval(timer); // Clear the timer to prevent it from running again
        }
    }, 1000); // Check every second
}

function updateCountdown() {
    fetch(getCurrentMonthCSV())
        .then(response => response.text())
        .then(csvContents => {
            filterByToday(csvContents);
        })
        .catch(error => {
            console.error('Error fetching or parsing CSV:', error);
        });
}

// Initial call to updateCountdown
updateCountdown();
