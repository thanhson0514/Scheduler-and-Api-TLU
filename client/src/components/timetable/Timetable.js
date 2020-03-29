import React, { useContext, useEffect, Fragment } from "react";

import TimetableContext from "../../actions/timetable/timetableContext";
import { Table } from "./Table";
import Snipper from "../layout/Spinner";
import weekIndex from "./weekIndex";

import "./Timetable.css";

export const Timetable = () => {
  const timetableContext = useContext(TimetableContext);
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
      filterSubject(courseSubject, weekIndex());
    }
    // eslint-disable-next-line
  }, [loading]);
  return (
    <Fragment>
      <div className="container-timetable">
        <h1>
          Week: {weekIndex()}
          <span>Hello</span>
        </h1>
        {!subject ? (
          <Snipper />
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
