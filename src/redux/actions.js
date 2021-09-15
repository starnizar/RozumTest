import {
    GET_INTRUDERS,
    HIDE_LOADING, SELECT_MEDIC,
    SET_EMPLOYEES,
    SET_WORKLOG,
    SHOW_LOADING,
} from "./types";


export function setEmployees(employees) {
    return {
        type: SET_EMPLOYEES,
        payload: employees
    }
}

export function setWorklog(worklog) {
    return {
        type: SET_WORKLOG,
        payload: worklog
    }
}

export function getIntruders(intruders) {
    return {
        type: GET_INTRUDERS,
        payload: intruders
    }
}

export function showLoading() {
    return {
        type: SHOW_LOADING
    }
}
export function hideLoading() {
    return {
        type: HIDE_LOADING
    }
}

export function selectMedic(medic) {
    return {
        type: SELECT_MEDIC,
        payload: medic
    }
}
