const Nexmo = require("nexmo");

exports.sendPhone = (req, res) => {
  try {
    const { phone, text } = req.body;
    const from = phone;
    const to = process.env.PHONE_NUMBER;
    const nexmo = new Nexmo({
      apiKey: process.env.API_KEY_PHONE,
      apiSecret: process.env.API_SECRET_PHONE
    });

    nexmo.message.sendSms(
      from,
      to,
      text,
      { type: "unicode" },
      (err, responseData) => {
        if (err) {
          return res.json({
            success: false,
            msg: "Send failed!"
          });
        } else {
          res.status(200).json({
            success: true,
            msg: `phone ${responseData.number} send success!`
          });
        }
      }
    );
  } catch (err) {
    res.status(500).json({
      success: false
    });
  }
};
