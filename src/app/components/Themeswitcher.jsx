import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styleThemeswitcher from './Themeswitcher.module.css';
import styleThemeswitcherDark from './ThemeswitcherDark.module.css';

function Themeswitcher(props) {
    const theme = useSelector(state => state.theme);
    const dispatcher = useDispatch();

    const name = theme == "DARK" ? "sunny-outline" : "sunny";
    const style = theme == "DARK" ? styleThemeswitcherDark : styleThemeswitcher;

    return (
        <button className={style.themeswitcher} onClick={() => dispatcher({type: "CHANGE_THEME"})}>
            <ion-icon name={name}></ion-icon>
        </button>
    )

}
export default Themeswitcher;