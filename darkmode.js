// Create a new XMLHttpRequest
var xhr = new XMLHttpRequest();

// Configure it: GET-request for the URL
xhr.open('GET', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQfoFEcprp-CYQjw40GrjdNWToUSvv10TjQzpw30vPkpLdwLz5NSeKKhNlsseeAkWR5wBAZLnzNpDcq/pub?output=csv', false);

// Send the request over the network
xhr.send();

if (xhr.status != 200) {
  // Analyze HTTP response status
  alert(`Error ${xhr.status}: ${xhr.statusText}`);
} else {
  // Show the result
  var data = xhr.responseText;
  var rows = data.split('\n');
  var headers = rows[0].split(',');
  var today = new Date();
  var todayRows = rows.filter(function(row) {
    var dateParts = row.split(',')[0].split('/');
    var rowDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
    return rowDate.toDateString() === today.toDateString();
  });

  if (todayRows.length > 0) {
    var times = todayRows[0].split(',');
    var sunriseParts = times[headers.indexOf('Sunrise')].split(':');
    var sunrise = new Date(today.getFullYear(), today.getMonth(), today.getDate(), sunriseParts[0], sunriseParts[1]);
    var maghribParts = times[headers.indexOf('Maghrib')].split(':');
    var maghrib = new Date(today.getFullYear(), today.getMonth(), today.getDate(), maghribParts[0], maghribParts[1]);

    var isNight = today < sunrise || today > maghrib;

    document.documentElement.style.setProperty('--text', isNight ? '#f8f9fb' : '#060504');
    document.documentElement.style.setProperty('--background', isNight ? '#060909' : '#f9f6f0');
    document.documentElement.style.setProperty('--primary', isNight ? '#4f638c' : '#b09c73');
    document.documentElement.style.setProperty('--secondary', isNight ? '#112036' : '#eedfc9');
    document.documentElement.style.setProperty('--accent', isNight ? '#d9d5cf' : '#262b31');

    var topnav = document.querySelector('.topnav');
    if (topnav) {
      topnav.style.filter = isNight ? 'invert(1)' : 'none';
    }
  }
}
