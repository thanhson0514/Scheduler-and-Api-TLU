import React, { useReducer } from "react";
import * as uuid from "uuid";
import alertReducer from "./alertReducer";
import AlertContext from "./alertContext";
import { SET_ALERT, CLEAR_ALERT } from "../types";
export const AlertState = props => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  const setAlert = (type, msg) => {
    const id = uuid.v4();
    console.log("alert", type, msg);
    dispatch({ type: SET_ALERT, payload: { id, type, msg } });

    setTimeout(() => dispatch({ type: CLEAR_ALERT, payload: id }), 4000);
  };

  return (
    <AlertContext.Provider
      value={{
        alert: state,
        setAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};
