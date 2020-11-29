const axios = require("axios");
const Auth = require("../models/auth");

exports.auth = async (req, res) => {
  try {
    const headers = {
      Accept: "application/json, text/plain, */*",
      "Accept-Language": "en-US,en;q=0.9",
      "Content-Type": "application/x-www-form-urlencoded"
    };
    const { username, password } = req.body;
    const form = `client_id=education_client&grant_type=password&username=${username}&password=${password}&client_secret=password`;
    const response = await axios({
      url: "http://sv20.tlu.edu.vn:8092/education/oauth/token",
      method: "POST",
      headers: headers,
      data: form
    });

    let auth = await Auth.findOne({ token: response.data.access_token });

    if (auth) {
      auth = await Auth.deleteMany();
      auth = new Auth({
        token: response.data.access_token
      });
      await auth.save();

      return res.status(200).json({
        success: true,
        access_token: auth.token
      });
    }

    auth = new Auth({
      token: response.data.access_token
    });
    await auth.save();

    return res.status(200).json({
      success: true,
      access_token: auth.token
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: 'Tài khoản không tồn tại hoặc mật khẩu sai'
    });
  }
};
