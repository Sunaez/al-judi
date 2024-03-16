function getCurrentMonthCSV() {
  return "https://docs.google.com/spreadsheets/d/e/2PACX-1vQfoFEcprp-CYQjw40GrjdNWToUSvv10TjQzpw30vPkpLdwLz5NSeKKhNlsseeAkWR5wBAZLnzNpDcq/pub?output=csv";
}

function getTodaysIshaTime(csv) {
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
      const ishaTime = rowData[10].trim(); // Isha Jamaat time

      // Convert Isha time to hours and minutes
      const ishaTimeParts = ishaTime.split(':');
      const ishaHour = parseInt(ishaTimeParts[0]);
      const ishaMinute = parseInt(ishaTimeParts[1]);

// Calculate Taraweeh start time (30 minutes after Isha)
const taraweehStartHour = (ishaHour + Math.floor((ishaMinute + 30) / 60)) % 24;
const taraweehStartMinute = (ishaMinute + 30) % 60;
const taraweehStart = new Date(yyyy, mm - 1, dd, taraweehStartHour, taraweehStartMinute);


      // Calculate Taraweeh end time (1 hour and 5 minutes after Isha)
      const taraweehEndHour = (ishaHour + Math.floor((ishaMinute + 65) / 60)) % 24;
      const taraweehEndMinute = (ishaMinute + 65) % 60;
      const taraweehEnd = new Date(yyyy, mm - 1, dd, taraweehEndHour, taraweehEndMinute);

      return { ishaTime, taraweehStart, taraweehEnd };
  }

  return null; // Return null if today's data is not found
}

function updateTaraweehTimes() {
  fetch(getCurrentMonthCSV())
      .then(response => response.text())
      .then(csvContents => {
          const taraweehTimes = getTodaysIshaTime(csvContents);
          if (taraweehTimes) {
              const currentTime = new Date();
              if (currentTime >= taraweehTimes.taraweehStart && currentTime <= taraweehTimes.taraweehEnd) {
                  document.getElementById('rmdn').style.display = 'block';
              } else {
                  document.getElementById('rmdn').style.display = 'none';
              }
          } else {
              console.log("Isha Jamaat time for today not found in the CSV.");
          }
      })
      .catch(error => {
          console.error('Error fetching or parsing CSV:', error);
      });
}

// Initial call to updateTaraweehTimes
updateTaraweehTimes();
// Set interval to update Taraweeh times periodically
setInterval(updateTaraweehTimes, 60000); // Update every minute (60000 milliseconds)
