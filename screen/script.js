const app = Vue.createApp({
    data() {
        return {
            currentTime: '',
            normalDate: '',
            hijriDate: '',
            prayerTimes: {
                Fajr: '',
                Dhuhr: '',
                Asr: '',
                Maghrib: '',
                Isha: ''
            },
            activeIndex: 0,
            rotatingContents: [
                { type: 'welcome' },
                { type: 'donation' },
                { type: 'quran', arabic: 'إِنَّ اللّهَ مَعَ الصَّابِرِينَ', translation: 'Indeed, Allah is with those who are patient.', source: 'Al-Baqarah 2:153' },
                { type: 'hadith', text: 'خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ', translation: 'The best of people are those who are most beneficial to people.', source: 'Hadith - Al-Mu’jam Al-Awsat' }
            ]
        };
    },
    methods: {
        updateTime() {
            const now = new Date();
            this.currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            this.normalDate = now.toLocaleDateString('en-GB', options);

            if (typeof writeIslamicDate === "function") {
                this.hijriDate = writeIslamicDate();
            } else {
                this.hijriDate = "Hijri date unavailable";
            }
        },
        fetchPrayerTimes() {
            fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vQfoFEcprp-CYQjw40GrjdNWToUSvv10TjQzpw30vPkpLdwLz5NSeKKhNlsseeAkWR5wBAZLnzNpDcq/pub?output=csv")
                .then(response => response.text())
                .then(csv => this.parsePrayerTimes(csv))
                .catch(error => console.error('Error fetching prayer times:', error));
        },
        parsePrayerTimes(csv) {
            const rows = csv.split('\n').map(row => row.split(','));
            const today = new Date().toLocaleDateString('en-GB').replace(/\//g, '-');

            for (const row of rows) {
                if (row[0].trim() === today) {
                    this.prayerTimes.Fajr = row[2];
                    this.prayerTimes.Dhuhr = row[5];
                    this.prayerTimes.Asr = row[7];
                    this.prayerTimes.Maghrib = row[8];
                    this.prayerTimes.Isha = row[10];
                    break;
                }
            }
        },
        rotateContent() {
            const oldIndex = this.activeIndex;
            this.activeIndex = (this.activeIndex + 1) % this.rotatingContents.length;

            // Animate the current (outgoing) content
            gsap.to(".rotating-content.active", {
                opacity: 0,
                y: 30,
                scale: 0.9,
                duration: 0.8,
                ease: "power2.inOut",
                onComplete: () => {
                    document.querySelectorAll('.rotating-content').forEach((el, idx) => {
                        el.classList.toggle('active', idx === this.activeIndex);
                    });

                    // Animate the new (incoming) content
                    gsap.fromTo(".rotating-content.active", 
                        { opacity: 0, y: -30, scale: 0.9 },
                        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out" }
                    );
                }
            });
        }
    },
    mounted() {
        this.updateTime();
        this.fetchPrayerTimes();
        setInterval(this.updateTime, 60000);
        setInterval(this.rotateContent, 6000); // Switch content every 6 seconds
    }
});

app.mount("#app");
