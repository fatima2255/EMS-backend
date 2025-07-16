// models/attendanceLog.js
const mongoose = require('mongoose');

const attendanceLogSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    ref: 'users',
  },
  activity: {
    type: String,
    enum: ['checkin', 'checkout', 'brb', 'back'],
    required: true,
  },
  activity_time: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true,
});

attendanceLogSchema.index({ userId: 1, activity_time: 1 });

module.exports = mongoose.model('Attendance_Log', attendanceLogSchema);
