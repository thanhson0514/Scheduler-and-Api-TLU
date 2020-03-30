import React, { useContext, useEffect, Fragment, useState } from "react";

import TimetableContext from "../../actions/timetable/timetableContext";
import { Table } from "./Table";
import Snipper from "../layout/Spinner";
import weekIndex from "./weekIndex";

import "./Timetable.css";

export const Timetable = () => {
  const date = new Date();
  const timetableContext = useContext(TimetableContext);
  const [index, setIndex] = useState(weekIndex);
  const [minutes, setMinutes] = useState(date.getMinutes());
  const {
    getSubjects,
    loading,
    courseSubject,
    filterSubject,
    timetables,
    subject
  } = timetableContext;
  // getSubjects();
  useEffect(() => {
    getSubjects();
    if (!loading) {
      filterSubject(courseSubject, index);
    }
    // eslint-disable-next-line
  }, [loading, index]);
  const increase = e => {
    setIndex(index + 1);
  };
  const decrease = e => {
    setIndex(index - 1);
  };
  setInterval(() => setMinutes(minutes + 1), 60000);
  return (
    <Fragment>
      <div className="container-timetable">
        <marquee>
          Today: {date.getDay()}/{date.getMonth()}/{date.getFullYear()} -{" "}
          {date.getHours()}:{minutes}
        </marquee>
        <h1>
          Week: {index}
          <span>Hello</span>
        </h1>
        <div className="btn-change-week">
          <button onClick={increase}>+</button>
          <button onClick={decrease}>-</button>
        </div>
        {!subject ? (
          <Snipper />
        ) : !subject.length ? (
          <h1>Không có lịch quẩy thôi :))</h1>
        ) : (
          subject.map((sub, index) => (
            <Table
              key={sub._id}
              displayName={sub.displayName}
              timetables={timetables[index]}
            />
          ))
        )}
      </div>
    </Fragment>
  );
};
