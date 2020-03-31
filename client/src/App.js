import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

// Provider Context
import AuthState from "./actions/auth/AuthState";
import TimetableState from "./actions/timetable/TimetableState";
import { PrivateRoute } from "./components/routing/PrivateRoute";

// Components and Router
import { Home } from "./components/layout/Home";
import Login from "./components/auth/Login";
import { SendPhone } from "./components/auth/SendPhone";
import { Timetable } from "./components/timetable/Timetable";
import Mark from "./components/mark/Mark";
import { Page404 } from "./components/layout/Page404";

// Redux
import { Provider } from "react-redux";
import store from "./store";

import setToken from "./constants/setToken";
import "./App.css";

console.log("Hello World!");
if (localStorage.token) {
  setToken(localStorage.token);
}

function App() {
  return (
    <Provider store={store}>
      <AuthState>
        <TimetableState>
          <Router>
            <Fragment>
              <Switch>
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute exact path="/timetable" component={Timetable} />
                <PrivateRoute exact path="/send" component={SendPhone} />
                <PrivateRoute exact path="/mark" component={Mark} />
                <Route path="/404" component={Page404} exact />
                <Redirect to="/404" />
              </Switch>
            </Fragment>
          </Router>
        </TimetableState>
      </AuthState>
    </Provider>
  );
}

export default App;
