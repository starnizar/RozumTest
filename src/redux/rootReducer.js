import {combineReducers} from "redux";
import {employeesReducer} from "./employeesReudcer";


export const rootReducer = combineReducers({
    employees: employeesReducer
})
