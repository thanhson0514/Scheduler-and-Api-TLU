import React, { useContext, useEffect, Fragment, useState } from "react";
import { connect } from "react-redux";

import TimetableContext from "../../actions/timetable/timetableContext";
import { Table } from "./Table";
import Snipper from "../layout/Spinner";
import weekIndex from "./weekIndex";
import Alert from "../layout/alert/Alert";
import { setAlert } from "../../actions/alert";

import "./Timetable.css";

const Timetable = props => {
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
    subject,
    success,
    error
  } = timetableContext;
  // getSubjects();
  useEffect(() => {
    getSubjects();
    if (!loading && success) {
      filterSubject(courseSubject, index);
    } else if (error) {
      setAlert("error", error);
    }
    // eslint-disable-next-line
  }, [loading, index, error]);
  const increase = (e) => {
    setIndex(index + 1);
  };
  const decrease = (e) => {
    setIndex(index - 1);
  };
  setInterval(() => setMinutes(minutes + 1), 60000);
  return (
    <Fragment>
      <div className="container-timetable">
        <marquee>
          Today: {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()} -{" "}
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
        {!subject ?
            !error ?
            <Snipper />:(
              <div>
                <Alert />
                <h1 style={{color: '#f11'}}>Lịch học chưa cập nhật</h1>
              </div>
            )
        : !subject.length ?
          <h1>Không có lịch quẩy thôi!</h1>
          : (
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

export default connect(null, { setAlert })(Timetable);
