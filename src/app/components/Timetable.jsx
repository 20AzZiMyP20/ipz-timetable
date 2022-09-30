import React, { useEffect, useRef, useState } from 'react';
import Task from './Task.jsx';
import { getDay } from '../../helpers/get-day.js';
import { Time } from '../../modules/Time.js';
import { normalizeFullDate } from '../../helpers/normalize-fullDate.js';
import { useSelector } from 'react-redux';
import styleTimetable from './Timetable.module.css';
import styleTimetableDark from './TimetableDark.module.css';
import './Timetable.css';

function Timetable({tasks, day}, ...props) {
    const theme = useSelector(state => state.theme);
    const style = theme == "DARK" ? styleTimetableDark : styleTimetable;

    const fullDate = normalizeFullDate(tasks[0]?.["full_date"]);
    const isToday = fullDate ? new Time(fullDate).isToday() : false;
    const elem = useRef();

    const focus = () => {
        document.documentElement.scrollTop = elem.current.offsetTop - window.innerHeight/2 + elem.current.offsetHeight/2;
    }

    useEffect(() => isToday ? focus() : undefined);

    return (
        <div id='timetable' className={style.timetable} {...props} ref={elem}>
            <h3 className={style.title}>{getDay(day)}</h3>
            <ul>
                {
                    tasks?.map((item, index, array) => {
                        return (
                            <Task 
                                studyTimeBegin={item['study_time_begin']} 
                                studyTimeEnd={item['study_time_end']} 
                                prevStudyTimeEnd={array[index-1]?.['study_time_end'] || '08:00'}
                                fullDate={item['full_date']}
                                discipline={item['discipline']} 
                                employee={item['employee']}
                                studyType={item['study_type']}
                                cabinet={item['cabinet']}
                                key={index}
                            />
                        ) 
                    })
                }
            </ul>
        </div>
    );

}

export default Timetable;