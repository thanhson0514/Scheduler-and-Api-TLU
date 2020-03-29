const axios = require("axios");

exports.getMark = async (req, res) => {
  try {
    const response = await axios.get(
      "http://sv20.tlu.edu.vn:8092/education/api/studentsubjectmark/getListStudentMarkBySemester/531/0",
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
