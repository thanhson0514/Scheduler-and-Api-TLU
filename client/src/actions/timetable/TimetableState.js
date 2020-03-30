import React, { useReducer } from "react";
import axios from "axios";
import * as uuid from "uuid";
import TimetableContext from "./timetableContext";
import timetableReducer from "./timetableReducer";
import { GET_TIMES, GET_SUBJECTS, GET_ERRORS, FILTER_SUBJECTS } from "../types";

// http://sv20.tlu.edu.vn:8092/education/api/coursehour/1/1000 @1000
// http://sv20.tlu.edu.vn:8092/education/api/StudentCourseSubject/student/0/2

const TimetableState = props => {
  const initialState = {
    courseSubject: [],
    times: [],
    loading: true,
    subject: null,
    timetables: []
  };

  const [state, dispatch] = useReducer(timetableReducer, initialState);

  const getTimes = async () => {
    try {
      const res = await axios.get("/api/times");
      dispatch({ type: GET_TIMES, payload: res.data.data.content });
    } catch (err) {
      dispatch({ type: GET_ERRORS });
    }
  };
  const getSubjects = async () => {
    try {
      const res = await axios.get("/api/subjects");

      dispatch({ type: GET_SUBJECTS, payload: res.data.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: GET_ERRORS });
    }
  };

  const filterSubject = async (courseSubject, index) => {
    try {
      const res = await axios({
        url: "/api/subjects",
        method: "POST",
        data: {
          courseSubject,
          index
        }
      });
      dispatch({
        type: FILTER_SUBJECTS,
        payload: { subject: res.data.subject, timetables: res.data.timetables }
      });
    } catch (err) {
      console.log(err);
      dispatch({ type: GET_ERRORS });
    }
  };

  return (
    <TimetableContext.Provider
      value={{
        courseSubject: state.courseSubject,
        times: state.times,
        subject: state.subject,
        timetables: state.timetables,
        loading: state.loading,
        getSubjects,
        getTimes,
        filterSubject
      }}
    >
      {props.children}
    </TimetableContext.Provider>
  );
};

export default TimetableState;
