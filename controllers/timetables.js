const axios = require("axios");

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

    const allowed = ["courseSubject"];
    const convertData = [];
    response.data.forEach(value => {
      const filtered = Object.keys(value)
        .filter(key => allowed.includes(key))
        .reduce((obj, key) => {
          obj = value[key];
          return obj;
        }, null);
      convertData.push(filtered);
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
