function getCurrentMonthCSV() {
    return 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQfoFEcprp-CYQjw40GrjdNWToUSvv10TjQzpw30vPkpLdwLz5NSeKKhNlsseeAkWR5wBAZLnzNpDcq/pub?output=csv';
}

async function fetchCSV() {
    try {
        const response = await fetch(getCurrentMonthCSV());
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
        document.getElementById('DhuhrStartTime').textContent = rowData[4];
        document.getElementById('DhuhrJamaatTime').textContent = rowData[5];
        document.getElementById('AsrStartTime').textContent = rowData[6];
        document.getElementById('AsrJamaatTime').textContent = rowData[7];
        document.getElementById('MaghribTime').textContent = rowData[8];
        document.getElementById('IshaTime').textContent = rowData[9];
        document.getElementById('IshaJamaatTime').textContent = rowData[10];
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

// Initial call to loadPrayerTimes
loadPrayerTimes();
