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
  PASSWORD_FAIL,
  LOGOUT
} from "../types";
const AuthState = props => {
  const initialState = {
    isAuthentication: null,
    loading: true,
    token: JSON.parse(localStorage.getItem("token"))
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  const headers = {
    Accept: "application/json, text/plain, */*",
    "Accept-Language": "en-US,en;q=0.9",
    "Content-Type": "application/x-www-form-urlencoded"
  };

  const loadAuth = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    // console.log(token)
    if (token) {
      dispatch({ type: LOADED_AUTH });
    } else {
      dispatch({ type: LOADED_FAIL });
    }
  };

  // Login
  const login = async formData => {
    if (localStorage.token) {
      setToken(localStorage.token);
    }
    try {
      const { username, password } = formData;
      const form = `client_id=education_client&grant_type=password&username=${username}&password=${password}&client_secret=password`;
      const res = await axios({
        url: "/oauth/token",
        method: "POST",
        headers: headers,
        data: form
      });
      console.log(res.data);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL
        // payload: err.response.data.error
      });
    }
  };

  const changePassword = async (username, oldPassword, newPassword) => {
    try {
      await axios.post("/api/users/password/valid", {
        password: oldPassword
      });
      await axios.put("/api/users/password/self", {
        username: username,
        password: newPassword
      });
    } catch (err) {
      dispatch({ type: PASSWORD_FAIL });
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
        login,
        loadAuth,
        logout,
        changePassword
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
