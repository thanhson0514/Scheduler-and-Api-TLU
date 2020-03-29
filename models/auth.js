const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Auth", AuthSchema);
