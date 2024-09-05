function formatDate(date) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
    ];

    const day = String(date.getDate()).padStart(2, '0');
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    return `${day} ${months[monthIndex]} ${year}`;
}

// Get today's date
const today = new Date();

// Format the date with long month name as DD Month YYYY
const formattedDate = formatDate(today);

// Display the formatted date in the "normal" div
document.getElementById('normal').textContent = formattedDate;