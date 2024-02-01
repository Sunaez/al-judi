class RamadanCountdown {
    constructor(targetDate) {
      this.targetDate = new Date(targetDate);
      this.daysElement = document.getElementById('Days');
      this.hoursElement = document.getElementById('Hours');
      this.minutesElement = document.getElementById('Minutes');
      this.secondsElement = document.getElementById('Seconds');
      
      this.updateCountdown();
      this.interval = setInterval(() => this.updateCountdown(), 1000);
    }
  
    updateCountdown() {
      const currentDate = new Date();
      const timeDifference = this.targetDate - currentDate;
  
      if (timeDifference <= 0) {
        clearInterval(this.interval);
        this.daysElement.textContent = '0';
        this.hoursElement.textContent = '0';
        this.minutesElement.textContent = '0';
        this.secondsElement.textContent = '0';
      } else {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
        this.daysElement.textContent = days;
        this.hoursElement.textContent = hours;
        this.minutesElement.textContent = minutes;
        this.secondsElement.textContent = seconds;
      }
    }
  }
  
  // Set the target date for Ramadan (11th of March at midnight)
  const targetDate = '2024-03-11T00:00:00';
  const ramadanCountdown = new RamadanCountdown(targetDate);