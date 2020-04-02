const axios = require("axios");

const sendTextMessage = require("../cron-scheduler/send-text-message");

exports.getUser = async (req, res) => {
  try {
    sendTextMessage(
      process.env.FACEBOOK_ID_USER,
      "Có 1 bạn đã đăng nhập vào web của bạn. Hãy kiểm tra nào!!"
    );
    const response = await axios.get(
      "http://sv20.tlu.edu.vn:8092/education/api/student/531",
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
