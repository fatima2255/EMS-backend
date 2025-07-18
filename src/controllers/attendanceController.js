const AttendanceLog = require('../models/attendanceLog');
const User = require('../models/userModel');

const createAttendanceLog = async (req, res) => {
  const { userId, activity } = req.body;

  try {
    // Get current date in local timezone
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const todayLogs = await AttendanceLog.find({
      userId,
      activity_time: { $gte: todayStart, $lte: todayEnd },
    }).sort({ activity_time: -1 });

    // Get last activity (if any)
    const lastActivity = todayLogs[0]?.activity;

    // Validation
    if (activity === 'checkin') {
      if (todayLogs.find(log => log.activity === 'checkin')) {
        return res.status(400).json({ error: 'Already checked in today.' });
      }
    }

    if (activity === 'checkout') {
      const hasCheckin = todayLogs.find(log => log.activity === 'checkin');
      const hasCheckout = todayLogs.find(log => log.activity === 'checkout');
      if (!hasCheckin) {
        return res.status(400).json({ error: 'Cannot checkout without checking in.' });
      }
      if (hasCheckout) {
        return res.status(400).json({ error: 'Already checked out today.' });
      }
    }

    if (activity === 'back') {
      // Find unmatched BRB (i.e. a BRB that does not have a BACK after it)
      const lastBrbIndex = todayLogs.findIndex(log => log.activity === 'brb');
      const hasBackAfterBrb = todayLogs
        .slice(0, lastBrbIndex)
        .some(log => log.activity === 'back');

      if (lastBrbIndex === -1 || todayLogs.find(log => log.activity === 'back' && log.activity_time > todayLogs[lastBrbIndex].activity_time)) {
        return res.status(400).json({ error: 'Cannot return from BRB without going on BRB.' });
      }
    }

    const newLog = new AttendanceLog({ userId, activity });
    await newLog.save();

    res.status(201).json(newLog);
  } catch (error) {
    console.error('Attendance error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// all users
const getAllLogs = async (req, res) => {
  try {
    const users = await User.find().select('userId firstName lastName');
    const userMap = new Map(users.map(user => [user.userId, user]));

    const logs = await AttendanceLog.find().sort({ activity_time: -1 });

    const enrichedLogs = logs.map(log => {
      const user = userMap.get(log.userId);
      const fullName = user ? `${user.firstName} ${user.lastName}` : 'Unknown';

      return {
        userId: log.userId,
        fullName,
        activity: log.activity,
        activity_time: log.activity_time,
      };
    });

    res.json(enrichedLogs);
  } catch (err) {
    console.error('Error fetching attendance logs:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};



// Get logs by user ID
const getUserLogs = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ userId }).select('firstName lastName');
    const logs = await AttendanceLog.find({ userId }).sort({ activity_time: -1 });

    const fullName = user ? `${user.firstName} ${user.lastName}` : 'Unknown';

    const enrichedLogs = logs.map(log => ({
      _id: log._id,
      userId: log.userId,
      fullName,
      activity: log.activity,
      activity_time: log.activity_time,
    }));

    res.json(enrichedLogs);
  } catch (err) {
    console.error('Error fetching user logs:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createAttendanceLog,
  getAllLogs,
  getUserLogs
};
