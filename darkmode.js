// Function to check if the current time is between two given times
function isTimeBetween(currentTime, startTime, endTime) {
  return currentTime >= startTime && currentTime <= endTime;
}

// Function to fetch prayer times from CSV file
async function fetchPrayerTimes() {
  try {
      const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQfoFEcprp-CYQjw40GrjdNWToUSvv10TjQzpw30vPkpLdwLz5NSeKKhNlsseeAkWR5wBAZLnzNpDcq/pub?output=csv');
      const csvData = await response.text();
      return csvData.split('\n').map(row => row.split(','));
  } catch (error) {
      console.error('Error fetching prayer times:', error);
      return [];
  }
}

// Function to convert DD/MM/YYYY date to a JavaScript Date object
function convertToDateObject(dateString) {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day); // month is 0-indexed in JavaScript Date
}

// Function to apply invert filter based on dark mode status
function applyInvertFilter(darkModeEnabled) {
  const bodyElement = document.body;
  if (bodyElement) {
      bodyElement.style.filter = darkModeEnabled ? 'invert(100%)' : 'none';
  }
}

// Function to determine dark mode status based on prayer times
function determineDarkModeStatus(currentTime, maghribTime, sunriseTime) {
  const maghribMinutes = (maghribTime[0] * 60 + maghribTime[1]) + 3;
  const sunriseMinutes = sunriseTime[0] * 60 + sunriseTime[1];
  return !isTimeBetween(currentTime, sunriseMinutes, maghribMinutes);
}

// Function to apply dark mode based on the time
async function applyDarkMode() {
  const now = new Date();
  const currentDate = now.toLocaleDateString('en-GB'); // Format as DD/MM/YYYY

  // Fetch and process prayer times
  const rows = await fetchPrayerTimes();

  // Find the row with the current date
  const currentDateRow = rows.find(row => row[0] === currentDate);

  if (currentDateRow && currentDateRow.length >= 9) {
      const maghribTime = currentDateRow[8].split(':').map(Number);
      const sunriseTime = currentDateRow[3].split(':').map(Number);

      const currentTime = now.getHours() * 60 + now.getMinutes();
      const darkModeEnabled = determineDarkModeStatus(currentTime, maghribTime, sunriseTime);

      // Apply invert filter based on dark mode status
      applyInvertFilter(darkModeEnabled);
  }
}

// Apply dark mode on page load
applyDarkMode();

// Check every minute and update dark mode
setInterval(applyDarkMode, 60000);
