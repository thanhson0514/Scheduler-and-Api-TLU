import React, { Fragment, useState, useContext, useEffect } from "react";

import AuthContext from "../../actions/auth/authContext";
import AlertContext from "../../actions/alert/alertContext";
import setToken from "../../constants/setToken";
import { Alert } from "../layout/alert/Alert";

import "./Login.css";

export const Login = props => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { login, isAuthentication, token, errors } = authContext;
  const { setAlert } = alertContext;
  const { username, password } = formData;

  useEffect(() => {
    if (isAuthentication && token) {
      setToken(JSON.stringify(token));
      props.history.push("/");
    } else if (errors) {
      setAlert("danger", errors);
    }
  }, [errors, props.history, isAuthentication, token]);

  const onSubmit = e => {
    e.preventDefault();
    login(formData);
  };

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <Alert />
      <div className="container-form">
        <form className="form-login" onSubmit={onSubmit}>
          <h2>Hello World</h2>
          <div className="input-group">
            <input
              type="text"
              name="username"
              value={username}
              onChange={onChange}
              required
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
            <label htmlFor="password">Password</label>
          </div>
          <button type="submit" className="btn">
            Login
          </button>
        </form>
      </div>
    </Fragment>
  );
};
