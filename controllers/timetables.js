const axios = require("axios");
const _ = require("lodash");
const uuid = require("uuid");
exports.times = async (req, res) => {
  try {
    const response = await axios.get(
      "http://sv20.tlu.edu.vn:8092/education/api/StudentCourseSubject/student/0/2",
      {
        headers: {
          Authorization: `Bearer ${req.token}`
        }
      }
    );

    res.status(200).json({
      success: true,
      data: response.data
    });
  } catch (err) {
    res.status(500).json({
      succes: false
    });
  }
};

exports.getSubject = async (req, res) => {
  try {
    const response = await axios.get(
      "http://sv20.tlu.edu.vn:8092/education/api/StudentCourseSubject/student/0/2",
      {
        headers: {
          Authorization: `Bearer ${req.token}`
        }
      }
    );

    const convertData = [];
    response.data.forEach(value => {
      const courseSubjects = _.get(value, "courseSubject");
      convertData.push(courseSubjects);
    });

    return res.status(200).json({
      success: true,
      data: convertData
    });
  } catch (err) {
    res.status(500).json({
      succes: false
    });
  }
};

exports.filterSubject = async (req, res) => {
  try {
    const weekIndex = req.body.index;
    const courseSubject = req.body.courseSubject;

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

    return res.status(200).json({
      success: true,
      subject: subject,
      timetables: timetables
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      succes: false
    });
  }
};
