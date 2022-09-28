import { getToday } from "./get-today.js";
export function isToday(day, c = ".") {
    const dd = day.split(c)[0];
    const mm = day.split(c)[1];
    const yy = day.split(c)[2];

    const today = getToday(c);

    return today.split(c)[0] == dd && today.split(c)[1] == mm && today.split(c)[2] == yy;
}