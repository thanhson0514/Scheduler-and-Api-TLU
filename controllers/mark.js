const axios = require("axios");

exports.getMark = async (req, res) => {
  try {
    let response = await axios.get(
      "http://sv20.tlu.edu.vn:8092/education/api/student/studentId",
      {
        headers: {
          Authorization: `Bearer ${req.token}`
        }
      }
    );

    const id = response.data.id;

    response = await axios.get(
      `http://sv20.tlu.edu.vn:8092/education/api/studentsubjectmark/getListStudentMarkBySemester/${id}/0`,
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
      success: false
    });
  }
};
