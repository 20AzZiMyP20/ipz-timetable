export class Time {
    constructor(...value) {
        this.date = new Date(...value);
    }

    isToday() {
        return this.dateToString() == new Time().dateToString();
    }

    getWeek() {
        const MS_DAY = 1000 * 60 * 60 * 24;
        const today = this.date;
        const days = [];

        for (let i = 0; i < 7; i++) {
            const date = new Time(today.getTime() - (today.getDay() - i) * MS_DAY);

            days.push(date);
        }

        return days;
    }

    getTime() {
        return this.date.getTime();
    }

    addTime(h, m = 0, s = 0, ms = 0) {
        const timestamp = this.date.getTime() + (h * 60 * 60 * 1000) + (m * 60 * 1000) + (s * 1000) + ms;
        this.date = new Date(timestamp);
    }

    addDate(years, months = 0, days = 0) {
        const timestamp = (
            this.date.getTime() +
            (years * 12 * 365 * 24 * 60 * 60 * 1000) +
            (months * 365 * 24 * 60 * 60 * 1000) +
            (days * 24 * 60 * 60 * 1000)
        );

        this.date = new Date(timestamp);
    }

    timeToString(c = ":") {
        let hours = this.date.getHours();
        let minutes = this.date.getMinutes();
        let seconds = this.date.getSeconds();

        hours = hours < 10 ? `0${hours}` : hours;
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;

        return `${hours}${c}${minutes}${c}${seconds}`;
    }

    dateToString(c = "-") {
        let year = this.date.getFullYear();
        let months = this.date.getMonth() + 1;
        let days = this.date.getDate();

        months = months < 10 ? `0${months}` : months;
        days = days < 10 ? `0${days}` : days;
        
        return `${year}${c}${months}${c}${days}`;
    }

    static diff(time1, time2) {
        const date = new Date();
        const userTimezoneOffset = -date.getTimezoneOffset() * 60 * 1000;
        const diff = time2.date.getTime() - time1.date.getTime();

        return new Time(diff - userTimezoneOffset);
    }
}

