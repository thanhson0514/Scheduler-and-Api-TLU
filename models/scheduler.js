const mongoose = require("mongoose");

const SchedulerSchema = new mongoose.Schema({
  idUser: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  startHour: {
    type: String,
    required: true
  },
  date: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Scheduler", SchedulerSchema);
