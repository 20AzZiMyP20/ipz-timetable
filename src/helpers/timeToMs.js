export function timeToMs(time) {
    const timearr = time.split(':');
    const ms = (timearr[0] * 60 * 60 * 1000) + (timearr[1] * 60 * 1000 || 0) + (timearr[2] * 1000 || 0);
    return ms;
}