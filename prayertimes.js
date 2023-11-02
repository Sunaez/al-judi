function getCurrentMonthCSV() {
    const today = new Date();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const csvFileName = `times_${mm}.${yyyy}.csv`;
    return csvFileName;
}

async function fetchCSV() {
    try {
        const response = await fetch(`/${getCurrentMonthCSV()}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch CSV file (${response.status} ${response.statusText})`);
        }
        const csvContents = await response.text();
        return csvContents;
    } catch (error) {
        console.error('Error fetching or parsing CSV:', error);
        return null;
    }
}

function updatePrayerTimes(csv) {
    const today = new Date();
    const formattedToday = today.toLocaleDateString();

    const matchingRow = csv.split('\n').find(row => {
        const rowData = row.split(',');
        return rowData[0].trim() === formattedToday;
    });

    if (matchingRow) {
        const rowData = matchingRow.split(',');

        document.getElementById('FajrStartTime').textContent = rowData[1];
        document.getElementById('FajrJamaatTime').textContent = rowData[2];
        document.getElementById('DhuhrStartTime').textContent = rowData[3];
        document.getElementById('DhuhrJamaatTime').textContent = rowData[4];
        document.getElementById('AsrStartTime').textContent = rowData[5];
        document.getElementById('AsrJamaatTime').textContent = rowData[6];
        document.getElementById('MaghribTime').textContent = rowData[7];
        document.getElementById('IshaTime').textContent = rowData[8];
        document.getElementById('IshaJamaatTime').textContent = rowData[9];
    }
}

async function loadPrayerTimes() {
    try {
        const csvContents = await fetchCSV();
        if (csvContents) {
            updatePrayerTimes(csvContents);
        }
    } catch (error) {
        console.error('Error loading prayer times:', error);
    }
}

loadPrayerTimes();
