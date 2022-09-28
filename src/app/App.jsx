import React, { useState, useEffect } from 'react';
import Timetable from './Timetable.jsx';
import "../../public/style.css";
import "../svg/anonym.svg"
import { getToweek } from '../helpers/get-toweek.js';
import { requestService } from '../services/request-service.js';

function App(props) {
    const [tasks, setTasks] = useState([]);
    const week = getToweek();

    useEffect(() => {
        const result = requestService.get(`https://vnz.osvita.net/BetaSchedule.asmx/GetScheduleDataX?_=1664347144555&aVuzID=11613&aStudyGroupID=%225RW9NBV4DGCB%22&aStartDate=%22${week[0]}%22&aEndDate=%22${week[6]}%22&aStudyTypeID=null`);

        result.then(value => setTasks(value.d));

    },[]);

    useEffect(()=>goToAnchor('anchor-today'));

    return week.map((itemWeek, index) => {
            const dayTasks = tasks.filter(item => item["full_date"] == itemWeek);
            return (<Timetable key={index} today={itemWeek} tasks={dayTasks} day={index}/>)
        });

}

export default App;

function goToAnchor(anchor) {
    const elem = document.querySelector("."+anchor);
    document.documentElement.scrollTop = elem.offsetTop - window.innerHeight/2 + elem.offsetHeight/2;
}