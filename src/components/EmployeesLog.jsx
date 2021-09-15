import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {getIntruders} from "../redux/actions";
import {useHistory} from "react-router-dom";
import loader from '../assets/img/loader2.svg'

const EmployeesLog = (props) => {

    const location = useHistory()
    const [analyzing, setAnalyzing] = useState(false)

    useEffect(() => {

        if (props.selected.id === undefined){
            location.push('/')
        }
        if (!props.intruders.length) {
            setAnalyzing(true)
            findIntruders(props.workLog).then((intruders)=> {
                props.getIntruders(intruders)
                setAnalyzing(false)
            })
        }


        function findIntruders(worklog) {
            return new Promise((resolve, reject) => {
                setTimeout(()=> {
                    let tomorrow = Number(new Date('2021-03-04 23:59:59'));
                    let today = Number(new Date('2021-03-04 00:00:00'));
                    let medics = 6
                    let intruders = []

                    for (; today < tomorrow; today += 1000) {
                        for (let i=0; i < worklog.length; i++) {
                            if (today === Number(new Date(worklog[i].to))) {
                                medics++
                            }
                            if (today === Number(new Date(worklog[i].from))) {
                                medics--
                                if (medics<3) {
                                    intruders.push(worklog[i])
                                }
                            }
                        }
                    }
                    resolve(intruders)
                }, 2000)
            })
        }
    }, [props, location])


    const checkedLogs = props.workLog.filter(item => item.employee_id === props.selected.id).map(log => {
            for (let item of props.intruders) {
                if  (log.id === item.id) {
                    log.intruder = true
                }
            }
            return log
    })

    return (
        <>
            {analyzing
                ? <div className='loader'><img src={loader} alt="Analyzing data..."/></div>
                :
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
            }
        </>
    )
}

const mapStateToProps = state => {
    return {
        workLog: state.employees.workLog,
        intruders: state.employees.intruders,
        loading: state.employees.loading,
        selected: state.employees.selected
    }
}

const mapDispatchToProps = {
    getIntruders
}


export default connect(mapStateToProps, mapDispatchToProps)(EmployeesLog)
