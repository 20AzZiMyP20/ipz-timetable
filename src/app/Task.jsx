import React, { useEffect, useState } from 'react';
import { getTime } from '../helpers/get-time.js'
import { isToday } from '../helpers/is-today.js';
import { msToTime } from '../helpers/msToTime.js';
import { timeToMs } from '../helpers/timeToMs.js';

function Task({studyTimeBegin, studyTimeEnd, prevStudyTimeEnd, discipline, employee, studyType, cabinet, avatar, className, day},...props) {
    const Avatar = avatar;
    const [timediff, setTimediff] = useState(`${studyTimeBegin} - ${studyTimeEnd}`);
    const [timeStyle, setTimeStyle] = useState({});
    const [active, setActive] = useState(false);

    const tickUpdate = function () {
        const timeNow = timeToMs(getTime());
        const timeBegin = timeToMs(studyTimeBegin);
        const timeEnd = timeToMs(studyTimeEnd);
        const prevTimeEnd = timeToMs(prevStudyTimeEnd);

        if (prevTimeEnd <= timeNow && timeNow < timeBegin && isToday(day)) {
            setTimediff(`${msToTime(timeToMs(studyTimeBegin) - timeToMs(getTime()))}`);
            setTimeStyle({backgroundColor: "#259765", color: '#fff', borderWidth: "0", borderRadius: "1rem"});
            
        } else if (prevTimeEnd <= timeNow && timeNow < timeEnd && isToday(day)){
            setTimediff(`${msToTime(timeToMs(studyTimeEnd) - timeToMs(getTime()))}`);
            setTimeStyle({backgroundColor: "#256197", color: '#fff', borderWidth: "0", borderRadius: "1rem"});
        } else {
            setTimediff(`${studyTimeBegin} - ${studyTimeEnd}`);
            setTimeStyle({});
        }
    };

    useEffect(()=>{
        const timeNow = timeToMs(getTime());
        const timeBegin = timeToMs(studyTimeBegin);
        const timeEnd = timeToMs(studyTimeEnd);
        const prevTimeEnd = timeToMs(prevStudyTimeEnd);

        if (prevTimeEnd <= timeNow && timeNow < timeBegin && isToday(day)) {
            setTimediff(`${msToTime(timeToMs(studyTimeBegin) - timeToMs(getTime()))}`);
            setTimeStyle({backgroundColor: "#259765", color: '#fff', borderWidth: "0", borderRadius: "1rem"});
            setActive(true);
        } else if (prevTimeEnd <= timeNow && timeNow < timeEnd && isToday(day)){
            setTimediff(`${msToTime(timeToMs(studyTimeEnd) - timeToMs(getTime()))}`);
            setTimeStyle({backgroundColor: "#256197", color: '#fff', borderWidth: "0", borderRadius: "1rem"});
            setActive(true);
        } else {
            setTimediff(`${studyTimeBegin} - ${studyTimeEnd}`);
            setTimeStyle({});
            setActive(false);
        }

        const id = setInterval(tickUpdate, 1000);
        return () => {clearInterval(id)};

    }, []);

    return (
        <li className={(className || '') + (active ? 'active' : '')} onClick={() => active ? setActive(false) : setActive(true)} {...props}>
            <span className={'time'} style={timeStyle}>{timediff}</span>
            <span className='vertical'></span>
            <span className='discipline'>{discipline}</span>
            <span className='vertical'></span>
            <span className='employee'>{employee}</span>
            <span className='type'>{studyType}</span>
            <span className='cabinet'>{cabinet}</span>
        </li>
    )

}
export default Task;
