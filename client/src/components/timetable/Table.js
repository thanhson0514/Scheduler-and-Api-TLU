import React from "react";

import handleDate from "./handleDate";
import "./Table.css";

export const Table = ({ displayName, timetables }) => {
  // const [filtered, setFiltered] = useState();
  return timetables.weekIndex === 0 &&
    !timetables.startHour &&
    !timetables.endHour ? null : (
    <div className="container-table">
      <div>
        <h4>{displayName}</h4>
        <p>
          Date:{" "}
          {timetables.weekIndex === 0
            ? "Đang cập nhật (updating)"
            : handleDate(timetables.weekIndex)}
        </p>
        <p>
          Room: {timetables.roomName ? timetables.roomName : "Học ngoài đường"}
        </p>
        <p>
          Lesson: {timetables.startHour ? timetables.startHour.name : "Chưa có"}{" "}
          - {timetables.endHour ? timetables.endHour.name : "Chưa có"}
        </p>
      </div>
    </div>
  );
};

/* <div className="container-table">
      <table>
        <tr>
          <th></th>
          <th>Monday</th>
          <th>TuesDay</th>
          <th>Wednesday</th>
          <th>Thursday</th>
          <th>Friday</th>
          <th>Saturday</th>
          <th>Sunday</th>
        </tr>
        <tr>
          <td>Lesson 1</td>
        </tr>
        <tr>
          <td>Lesson 2</td>
        </tr>
        <tr>
          <td>Lesson 3</td>
        </tr>
        <tr>
          <td>Lesson 4</td>
        </tr>
        <tr>
          <td>Lesson 5</td>
        </tr>
        <tr>
          <td>Lesson 6</td>
        </tr>
        <tr>
          <td>Lesson 7</td>
        </tr>
        <tr>
          <td>Lesson 8</td>
        </tr>
        <tr>
          <td>Lesson 9</td>
        </tr>
        <tr>
          <td>Lesson 10</td>
        </tr>
        <tr>
          <td>Lesson 11</td>
        </tr>
        <tr>
          <td>Lesson 12</td>
        </tr>
        <tr>
          <td>Lesson 13</td>
        </tr>
        <tr>
          <td>Lesson 14</td>
        </tr>
        <tr>
          <td>Lesson 15</td>
        </tr>
      </table>
    </div> */
