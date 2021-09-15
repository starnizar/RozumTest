import {
    GET_INTRUDERS,
    HIDE_LOADING, SELECT_MEDIC,
    SET_EMPLOYEES,
    SET_WORKLOG,
    SHOW_LOADING,
} from "./types";


const initialState = {
    employeesList: [],
    workLog: [],
    intruders: [],
    selected: {},
    loading: true
}

export const employeesReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_EMPLOYEES:
            return {...state, employeesList: [...action.payload]}
        case SET_WORKLOG:
            return {...state, workLog: [...action.payload]}
        case SHOW_LOADING:
            return {...state, loading: true}
        case HIDE_LOADING:
            return {...state, loading: false}
        case GET_INTRUDERS:
            return {...state, intruders: [...action.payload]}
        case SELECT_MEDIC:
            return {...state, selected: {...action.payload}}
        default: return state
    }
}
