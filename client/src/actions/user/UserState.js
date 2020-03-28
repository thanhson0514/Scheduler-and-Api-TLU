import React, { useReducer } from "react";
import axios from "axios";
import UserContext from "./userContext";
import userReducer from "./userReducer";
import { GET_USER, USER_ERROR } from "../types";

// http://sv20.tlu.edu.vn:8092/education/api/student/531
export const UserState = props => {
  const initialState = {
    loading: true,
    displayName: "",
    studentCode: "",
    birthPlace: "",
    email: "",
    image: null,
    linkFb: null,
    person: {}
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  // get info user
  const getUser = async () => {
    try {
      const res = await axios.get("/api/student/531");
      console.log(res.data);

      dispatch({ type: GET_USER, payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: USER_ERROR });
    }
  };
  return (
    <UserContext.Provider
      value={{
        displayName: state.displayName,
        studentCode: state.studentCode,
        birthPlace: state.birthPlace,
        email: state.email,
        person: state.person,
        image: state.image,
        linkFb: state.linkFb,
        loading: state.loading,
        getUser
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
