const mongoose = require('mongoose');

const liveClassSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  organizer: {
    type: String,
    required: true,
  },
  batch_no: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const LiveClass = mongoose.model('LiveClass', liveClassSchema);
module.exports = LiveClass;
