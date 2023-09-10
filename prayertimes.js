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
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const formattedToday = `${dd}/${mm}/${yyyy}`;

    const matchingRow = csv.split('\n').find(row => {
        const rowData = row.split(',');
        return rowData[0].trim() === formattedToday;
    });

    if (matchingRow) {
        const rowData = matchingRow.split(',');

        // Update the Start and Jama'at times in your HTML table
        document.getElementById('FajrStartTime').textContent = rowData[1]; // Fajr Start
        document.getElementById('FajrJamaatTime').textContent = rowData[2]; // Fajr Jamaat
        document.getElementById('DhuhrStartTime').textContent = rowData[3]; // Dhuhr Start
        document.getElementById('DhuhrJamaatTime').textContent = rowData[4]; // Dhuhr Jamaat
        document.getElementById('AsrStartTime').textContent = rowData[5];  // Asr Start
        document.getElementById('AsrJamaatTime').textContent = rowData[6];  // Asr Jamaat
        document.getElementById('MaghribTime').textContent = rowData[7]; // Maghrib (Regular time)
        document.getElementById('IshaTime').textContent = rowData[8];  // Isha (Regular time)

        // Calculate time until next prayer
        const currentHour = today.getHours();
        const currentMinute = today.getMinutes();
        const nextPrayerTimes = [
            { time: rowData[2], name: 'Fajr Jamaat' },
            { time: rowData[4], name: 'Dhuhr Jamaat' },
            { time: rowData[6], name: 'Asr Jamaat' },
            { time: rowData[7], name: 'Maghrib' },
            { time: rowData[8], name: 'Isha' }
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
updateCountdown();