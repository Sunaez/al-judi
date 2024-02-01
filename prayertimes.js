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
        document.getElementById('FajrStartTime').textContent = rowData[1]; // Fajr
        document.getElementById('FajrJamaatTime').textContent = rowData[2]; // Fajr Jamaat
        document.getElementById('DhuhrStartTime').textContent = rowData[4]; // Dhuhr Jamaat
        document.getElementById('DhuhrJamaatTime').textContent = rowData[5]; // Dhuhr Jamaat
        document.getElementById('AsrStartTime').textContent = rowData[6];  // Asr Jamaat
        document.getElementById('AsrJamaatTime').textContent = rowData[7];  // Asr Jamaat
        document.getElementById('MaghribTime').textContent = rowData[8]; // Maghrib (Regular time)
        document.getElementById('IshaTime').textContent = rowData[9];  // Isha (Regular time)
        document.getElementById('IshaJamaatTime').textContent = rowData[10];  // Isha (Regular time)
            }
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
