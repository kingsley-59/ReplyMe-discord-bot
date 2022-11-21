
const milisPerSecond = 1000
const milisPerMinute = 1000 * 60
const milisPerHour = 1000 * 3600
const milisPerDay = 1000 * 3600 * 24


class TimeDifference {
    constructor(startTime, endTime) {
        const start = new Date(startTime).getTime()
        const end = new Date(endTime).getTime()
        this.differenceInMilliseconds = end - start

        return this.differenceInMilliseconds
    }

    padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    convertMillisToTime(millisecs) {
        const milliseconds = millisecs ?? this.differenceInMilliseconds
        let seconds = Math.floor(milliseconds / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);

        seconds = seconds % 60;
        // 👇️ if seconds are greater than 30, round minutes up (optional)
        minutes = seconds >= 30 ? minutes + 1 : minutes;

        minutes = minutes % 60;

        // 👇️ If you don't want to roll hours over, e.g. 24 to 00
        // 👇️ comment (or remove) the line below
        // commenting next line gets you `24:00:00` instead of `00:00:00`
        // or `36:15:31` instead of `12:15:31`, etc.
        // hours = hours % 24;

        // return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
        return `${hours}hrs ${minutes}mins ${seconds}secs`
    }

    static dateIsValid(date) {
        const timestamp = Date.parse(date)
        
        if (isNaN(timestamp) === false) {
            return false
        }
        return true
    }
}

module.exports = TimeDifference