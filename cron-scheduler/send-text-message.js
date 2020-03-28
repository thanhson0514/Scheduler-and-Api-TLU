const text = `Bot chỉ phục vụ cho master Sơn (Sơn rất đẹp trai) nên bạn không nhắn tinvới mình được đâu:/n
+ Nhấn "update" để cập nhật thời khóa biểu
+ Nhấn "all + password" để xem thời khóa biểu
- Hiện giờ chức năng thứ 2 (all + password) đang nâng cấp 
`;
const sendTextMessage = async (userId, message = text) => {
  return require("node-fetch")(
    `https://graph.facebook.com/v6.0/me/messages?access_token=${process.env.FACEBOOK_ACCESS_TOKEN}`,
    {
      headers: {
        "Content-Type": "Application/json"
      },
      method: "POST",
      body: JSON.stringify({
        messaging_type: "RESPONSE",
        recipient: {
          id: userId
        },
        message: {
          text: message
        }
      })
    }
  );
};

module.exports = sendTextMessage;
