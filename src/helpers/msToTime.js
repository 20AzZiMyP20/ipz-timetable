export function msToTime(ms) {
    let sec = Math.floor(ms / 1000);
    let minute = Math.floor(sec / 60);
    let hours = Math.floor(minute / 60);

    ms = ms % 1000;
    sec = sec % 60;
    minute = minute % 60;
    hours = hours % 24;

    return `${hours < 10 ? '0' + hours : hours}:${minute < 10 ? '0' + minute : minute}:${sec < 10 ? '0' + sec : sec}`;
}