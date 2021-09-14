import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {getIntruders, startAnalyze, stopAnalyze} from "../redux/actions";
import {useHistory} from "react-router-dom";
import loader from '../assets/img/loader2.svg'

const EmployeesLog = (props) => {

    const location = useHistory()

    useEffect(() => {

        if (props.selected.id === undefined){
            location.push('/')
        }
        if (!props.intruders.length) {
            props.startAnalyze()
            props.getIntruders(findIntruders(props.workLog)) // цикл замораживает страницу, не знаю как сделать его асинхронным
        }

        function findIntruders(worklog) {
            let tomorrow = Number(new Date('2021-03-04 23:59:59'));
            let today = Number(new Date('2021-03-04 00:00:00'));
            let intruders = []

            for (let j=6; today < tomorrow; today += 1000) {
                for (let i=0; i < worklog.length; i++) {
                    if (today === Number(new Date(worklog[i].to))) {
                        j++
                    }
                    if (today === Number(new Date(worklog[i].from))) {
                        j--
                        if (j<3) {
                            intruders.push(worklog[i])
                        }
                    }
                }
            }
            props.stopAnalyze()
            return intruders
        }
    })

    if (props.analyzing) {
        return <div className='loader'><img src={loader} alt="Analyzing data..."/></div>
    }


    const checkedLogs = props.workLog.filter(item => item.employee_id === props.selected.id).map(log => {
            for (let item of props.intruders) {
                if  (log.id === item.id) {
                    log.intruder = true
                }
            }
            return log
    })

    return (
        <div className='employeesLogWrapper'>
            <h3>{props.selected.lastName} {props.selected.firstName} {props.selected.middleName}</h3>
            <table>
                <tbody>
                    <tr>
                        <th>Отметка о прибытии</th>
                        <th>Отметка об уходе</th>
                    </tr>
                    {checkedLogs.map(item => (
                        <tr key={item.id}>
                            <td>{item.to}</td>
                            <td style={ item.intruder?{color: 'red'}: null}>{item.from}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        workLog: state.employees.workLog,
        intruders: state.employees.intruders,
        loading: state.employees.loading,
        analyzing: state.employees.analyzing,
        selected: state.employees.selected
    }
}

const mapDispatchToProps = {
    stopAnalyze, getIntruders, startAnalyze
}


export default connect(mapStateToProps, mapDispatchToProps)(EmployeesLog)
