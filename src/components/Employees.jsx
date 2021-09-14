import React from 'react'
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import {selectMedic} from "../redux/actions";
import loader from '../assets/img/loader1.svg'

const Employees = (props) => {

    const location = useHistory()

    if (props.loading) {
        return <div className='loader'><img src={loader} alt="Loading..."/></div>
    }

    const fioHandler = medic => {
        props.selectMedic(medic)
        location.push('/employees-log')
    }

    return (
        <div className='employeesWrapper'>
            <table>
                <tbody>
                <tr className='tHeader'>
                    <th>id</th>
                    <th>ФИО</th>
                    <th>Дата рождения</th>
                </tr>
                {props.employees.map( item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td className='fio' onClick={() => fioHandler(item)}> {item.lastName} {item.firstName} {item.middleName}</td>
                        <td>{item.birthDate.split('-').reverse().join('.')}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        employees: state.employees.employeesList,
        loading: state.employees.loading,
    }
}

const mapDispatchToProps = {
    selectMedic
}

export default connect(mapStateToProps, mapDispatchToProps)(Employees)
