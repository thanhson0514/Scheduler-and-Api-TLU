import React, { useReducer } from "react";
import axios from "axios";

import setToken from "../../constants/setToken";
import authReducer from "./authReducer";
import AuthContext from "./authContext";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOADED_AUTH,
  LOADED_FAIL,
  SEND_EMAIL,
  EMAIL_ERROR,
  CLEAR_ERRORS,
  LOGOUT
} from "../types";
const AuthState = props => {
  const initialState = {
    errors: "",
    isAuthentication: null,
    loading: true,
    token: JSON.parse(sessionStorage.getItem("token"))
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const loadAuth = () => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    // console.log(token)
    if (token) {
      dispatch({ type: LOADED_AUTH });
    } else {
      dispatch({ type: LOADED_FAIL });
    }
  };

  // Login
  const login = async formData => {
    if (sessionStorage.token) {
      setToken(sessionStorage.token);
    }
    try {
      const { username, password } = formData;
      const res = await axios({
        url: "/api/auth",
        method: "POST",
        data: {
          username: username,
          password: password
        }
      });

      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    } catch (err) {
      console.log(err.response.data, err);
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      });
      setTimeout(
        () =>
          dispatch({
            type: CLEAR_ERRORS
          }),
        3000
      );
    }
  };

  // send email
  const sendEmail = async formData => {
    try {
      const { phone, text } = formData;
      const res = axios({
        url: "/api/send",
        method: "POST",
        data: {
          phone,
          text
        }
      });

      dispatch({ type: SEND_EMAIL, payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: EMAIL_ERROR });
    }
  };

  // logout
  const logout = () => dispatch({ type: LOGOUT });
  return (
    <AuthContext.Provider
      value={{
        isAuthentication: state.isAuthentication,
        loading: state.loading,
        token: state.token,
        errors: state.errors,
        login,
        loadAuth,
        logout,
        sendEmail
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;

// change pass: http://sv20.tlu.edu.vn:8092/education/api/users/password/valid
// and: http://sv20.tlu.edu.vn:8092/education/api/users/password/self
// client_id: education_client
// grant_type: password
// username: {username}
// password: {password}
// client_secret: password
// Host: "sv20.tlu.edu.vn:8092",
// Origin: "http://sinhvien.tlu.edu.vn",
// Referer: "http://sinhvien.tlu.edu.vn/",
// "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36"
// "Accept-Encoding": "gzip, deflate",
// Connection: "keep-alive",
// "Content-Length": 111,
