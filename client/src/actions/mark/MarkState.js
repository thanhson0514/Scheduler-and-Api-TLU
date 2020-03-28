import React, { useReducer } from "react";
import axios from "axios";
import MarkContext from "./markContext";
import markReducer from "./markReducer";
import { GET_MARKS, GET_ERRORS } from "../types";

export const MarkState = props => {
  const initialState = {
    mark: "",
    charMark: "",
    mark4: "",
    markQT: "",
    markTHI: "",
    subjectName: "",
    content: [],
    loading: true
  };

  const [state, dispatch] = useReducer(markReducer, initialState);

  // get Mark
  const getMark = async () => {
    try {
      const res = await axios.get(
        "/api/studentsubjectmark/getListStudentMarkBySemester/531/0"
      );
      console.log(res.data);
      dispatch({ type: GET_MARKS, payload: res.data });
    } catch (err) {
      dispatch({ type: GET_ERRORS });
    }
  };

  return (
    <MarkContext.Provider
      value={{
        loading: state.loading,
        content: state.content,
        getMark
      }}
    >
      {props.children}
    </MarkContext.Provider>
  );
};
