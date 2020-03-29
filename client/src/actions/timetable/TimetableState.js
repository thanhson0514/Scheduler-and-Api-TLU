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

      // console.log("data:", convertData);
      dispatch({ type: GET_SUBJECTS, payload: res.data.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: GET_ERRORS });
    }
  };

  const filterSubject = (courseSubject, weekIndex) => {
    const subject = [];
    const timetables = [];
    for (let i = 0; i < courseSubject.length; i++) {
      for (let j = 0; j < courseSubject[i].timetables.length; j++) {
        if (
          courseSubject[i].timetables[j].fromWeek <= weekIndex &&
          courseSubject[i].timetables[j].toWeek >= weekIndex
        ) {
          subject.push({ ...courseSubject[i], _id: uuid.v4() });
          timetables.push(courseSubject[i].timetables[j]);
        }
      }
    }
    // console.log("response", subject, timetables);
    dispatch({ type: FILTER_SUBJECTS, payload: { subject, timetables } });
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
