import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { normalizeFullDate } from '../../helpers/normalize-fullDate.js';
import { Time } from '../../modules/Time.js';
import styleTask from './Task.module.css';
import styleTaskDark from './TaskDark.module.css';

function Task({studyTimeBegin, studyTimeEnd, prevStudyTimeEnd, fullDate, discipline, employee, studyType, cabinet}, ...props) {
    const theme = useSelector(state => state.theme);
    const style = theme == "DARK" ? styleTaskDark : styleTask;

    const [time, setTime] = useState(`${studyTimeBegin} - ${studyTimeEnd}`);
    const [listStyle, setListStyle] = useState({});
    const [before, setBefore] = useState(false);
    const [after, setAfter] = useState(false);

    fullDate = normalizeFullDate(fullDate);

    const timeBegin = new Time(`${fullDate}T${studyTimeBegin}`);
    const timeEnd = new Time(`${fullDate}T${studyTimeEnd}`);
    const timePrev = new Time(`${fullDate}T${prevStudyTimeEnd}`);

    const expandAndCollapse = () => setListStyle({height: listStyle.height ? undefined : "14rem"});

    const tick = function () {
        const timeNow = new Time(Date.now());

        if (timePrev.getTime() <= timeNow.getTime() && timeNow.getTime() <= timeBegin.getTime()) {
            const diff = Time.diff(timeNow, timeBegin).timeToString();

            setBefore(true);
            setAfter(false);
            setTime(diff);

        } else if (timePrev.getTime() <= timeNow.getTime() && timeNow.getTime() <= timeEnd.getTime()) {
            const diff = Time.diff(timeNow, timeEnd).timeToString();

            setBefore(false);
            setAfter(true);
            setTime(diff);
            
        } else {
            setBefore(false);
            setAfter(false);
            setTime(`${studyTimeBegin} - ${studyTimeEnd}`);
        }
    };

    useEffect(() => {
        const id = setInterval(tick, 1000);
        tick();
        return () => clearInterval(id);
    }, []);

    return (
        <li className={style.task} style={listStyle} {...props} onClick={expandAndCollapse}>
            <span className={style.time + (before ? " " + style.before : "") + (after ? " " + style.after : "")}>{time}</span>
            <span className={style.discipline}>{discipline}</span>
            <span className={style.employee}>{employee}</span>
            <span className={style.type}>{studyType}</span>
            <span className={style.cabinet}>{cabinet}</span>
        </li>
    )

}
export default Task;
