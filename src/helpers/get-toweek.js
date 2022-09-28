export function getToweek(c = "."){
    const day = 1000 * 60 * 60 * 24;
    const today = new Date();
    const days = [];

    for (let i = 0; i < 7; i++) {
        const date = new Date(today.getTime() - (today.getDay() - i) * day);
        days.push([(date.getDate()) < 10 ? `0${date.getDate()}` : date.getDate(), (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1, date.getFullYear()].join(c));
    }

    return days;
}