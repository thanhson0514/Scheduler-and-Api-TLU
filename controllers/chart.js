const axios = require("axios");

exports.getChart = async (req, res) => {
  try {
    const response = await axios.get(
      "http://sinhvien.tlu.edu.vn:8099/education/api/studentsubjectmark/getListStudentMarkBySemesterByLoginUser/0",
      {
        headers: {
          Authorization: `Bearer ${req.token}`,
        },
      }
    );
    const data = {};
    for (let i = 0; i < response.data.length; ++i) {
      if (response.data[i].semester) {
        if (!data[response.data[i].semester.id]) {
          data[response.data[i].semester.id] = [];
          data[response.data[i].semester.id].push({
            numberOfCredit: response.data[i].subject.numberOfCredit,
            mark4: response.data[i].mark4,
          });
        } else {
          data[response.data[i].semester.id].push({
            numberOfCredit: response.data[i].subject.numberOfCredit,
            mark4: response.data[i].mark4,
          });
        }
      }
    }
    console.log(data);
    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
      console.log(error)
    res.status(500).json({
      success: false,
    });
  }
};
