import React from "react";

import filterCharMark from "./filterCharMark";
import "./MarkItem.css";

export const MarkItem = ({
  mark,
  charMark,
  mark4,
  markQT,
  markTHI,
  subjectName
}) => {
  return (
    <div className="info-mark">
      <h3>Subject: {subjectName}</h3>
      <div className="content">
        <div className="content__right">
          <div className="content__mark">Mark: {mark}</div>
          <div className="content__mark4">coefficient 4: {mark4}</div>
        </div>
        <div
          className={`content__charMark content__charMark-${filterCharMark(
            charMark
          )}`}
        >
          <p>{charMark}</p>
        </div>
        <div className="content__left">
          <div className="content__markQT">QT: {markQT}</div>
          <div className="content__markTHI">Thi: {markTHI}</div>
        </div>
      </div>
    </div>
  );
};
