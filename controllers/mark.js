const axios = require("axios");

exports.getMark = async (req, res) => {
  try {
    console.log(req.token)
    const response = await axios.get(
      'http://sinhvien.tlu.edu.vn:8099/education/api/studentsubjectmark/getListStudentMarkBySemesterByLoginUser/0',
      {
        headers: {
          Authorization: `Bearer ${req.token}`
        }
      }
    );
    const data = response.data.sort((a,b) => a.charMark.charCodeAt()-b.charMark.charCodeAt())

    res.status(200).json({
      success: true,
      data: data
    });
  } catch (err) {
    res.status(500).json({
      success: false
    });
  }
};
