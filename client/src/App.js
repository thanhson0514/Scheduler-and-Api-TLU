import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

// Provider Context
import AuthState from "./actions/auth/AuthState";
import { UserState } from "./actions/user/UserState";
import TimetableState from "./actions/timetable/TimetableState";
import { MarkState } from "./actions/mark/MarkState";
import { PrivateRoute } from "./components/routing/PrivateRoute";

// Components and Router
import { Home } from "./components/layout/home/Home";
import { Login } from "./components/auth/Login";
import { ChangePassword } from "./components/auth/ChangePassword";
import { Timetable } from "./components/timetable/Timetable";
import { Mark } from "./components/mark/Mark";
import { Page404 } from "./components/layout/Page404";

import setToken from "./constants/setToken";
import "./App.css";

console.log("Hello World!");
if (localStorage.token) {
  setToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <UserState>
        <TimetableState>
          <MarkState>
            <Router>
              <Fragment>
                <Switch>
                  <Route exact path="/login" component={Login} />
                  <PrivateRoute exact path="/" component={Home} />
                  <PrivateRoute exact path="/timetable" component={Timetable} />
                  <PrivateRoute
                    exact
                    path="/change-password"
                    component={ChangePassword}
                  />
                  <PrivateRoute exact path="/mark" component={Mark} />
                  <Route path="/404" component={Page404} exact />
                  <Redirect to="/404" />
                </Switch>
              </Fragment>
            </Router>
          </MarkState>
        </TimetableState>
      </UserState>
    </AuthState>
  );
}

export default App;
