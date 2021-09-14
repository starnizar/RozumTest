import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Route, BrowserRouter, Switch, Redirect} from "react-router-dom";
import './App.css';
import Employees from "./components/Employees";
import EmployeesLog from "./components/EmployeesLog";
import {getEmployees, getWorklog} from "./api";
import {hideLoading, setEmployees, setWorklog} from "./redux/actions";

function App(props) {

    useEffect(() => {
        (async function () {
            const fetchedEmployees = await getEmployees()
            const fetchedWorklog = await  getWorklog()
            props.setEmployees(fetchedEmployees.sort((a, b) => a.lastName < b.lastName ? -1 : 1))
            props.setWorklog(fetchedWorklog)
            setTimeout(() => props.hideLoading(), 1000)
        }) ()
    }, [props])


  return (
      <BrowserRouter>
        <div className="App">
            <Switch>

                <Route exact path='/'>
                   <Redirect to='/employees' />
                </Route>

                <Route exact path='/employees'>
                    <Employees />
                </Route>

                <Route path='/employees-log'>
                    <EmployeesLog />
                </Route>

            </Switch>
        </div>
      </BrowserRouter>

  );
}


const mapDispatchToProps = {
    setEmployees, setWorklog, hideLoading
}

export default connect(null, mapDispatchToProps)(App)
