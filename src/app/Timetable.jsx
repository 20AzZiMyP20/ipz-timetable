import React, { useEffect, useState } from 'react';
import { requestService } from '../services/request-service.js';
import { getToday } from '../helpers/get-today.js';
import { getTime } from '../helpers/get-time.js';
import Task from './Task.jsx';
import Avatar from '../svg/anonym.svg';
import "./Timetable.css";
import { isToday } from '../helpers/is-today.js';
import { getDay } from '../helpers/get-day.js';

function Timetable({tasks, today, day}, ...props) {

    return (
        <div id='timetable' className={isToday(today) ? 'anchor-today' : ''}>
            <h3>{getDay(day)}</h3>
            <ul>
                {
                    tasks?.map((item, index, array) => {
                        return (
                            <Task 
                                studyTimeBegin={item['study_time_begin']} 
                                studyTimeEnd={item['study_time_end']} 
                                prevStudyTimeEnd={array[index-1]?.['study_time_end'] || '08:00'}
                                discipline={item['discipline']} 
                                employee={item['employee']}
                                studyType={item['study_type']}
                                cabinet={item['cabinet']}
                                avatar={Avatar}
                                day={today}
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

