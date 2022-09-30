import React, { useState, useEffect } from 'react';
import Timetable from './components/Timetable.jsx';
import { requestService } from '../services/request-service.js';
import { Time } from '../modules/Time.js';
import { unnormalizeFullDate } from '../helpers/unnormalize-fullDate.js';
import { useSelector } from 'react-redux';

import styleRoot from '../style/style.module.css';
import styleDarkRoot from '../style/styleDark.module.css';
import Themeswitcher from './components/Themeswitcher.jsx';
import "../style/style.css";

function App(props) {
    const theme = useSelector(state => state.theme);
    const style = theme == "DARK" ? styleDarkRoot : styleRoot;

    const [tasks, setTasks] = useState([]);
    const week = new Time().getWeek().map(day => unnormalizeFullDate(day.dateToString()));

    useEffect(() => {
        const result = requestService.get(`https://vnz.osvita.net/BetaSchedule.asmx/GetScheduleDataX?_=1664347144555&aVuzID=11613&aStudyGroupID=%225RW9NBV4DGCB%22&aStartDate=%22${week[0]}%22&aEndDate=%22${week[6]}%22&aStudyTypeID=null`);

        result.then(value => setTasks(value.d));
    },[]);

    useEffect(() => {document.body.className = style.body});

    return [<Themeswitcher/>,
            week.map((itemWeek, index) => {
            const dayTasks = tasks.filter(item => item["full_date"] == itemWeek);

            return (<Timetable key={index} tasks={dayTasks} day={index}/>)
        })];

}

export default App;