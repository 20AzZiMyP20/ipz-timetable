import { createStore } from "redux";

function themeReducer(state = {theme: localStorage.getItem("theme") || "LIGHT"}, action) {
    switch (action.type) {
        case "CHANGE_THEME":
            localStorage.setItem("theme", state.theme == "LIGHT" ? "DARK" : "LIGHT");
            return {theme: state.theme == "LIGHT" ? "DARK" : "LIGHT"};
        default:
            return state;
    }
}

export const store = createStore(themeReducer);