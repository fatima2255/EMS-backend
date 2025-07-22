const User = require('../models/userModel');
const EmployeeInfo = require('../models/employeeModel');
const Task = require('../models/taskModel');
const Project = require('../models/projectModel');
const AttendanceLog = require('../models/attendanceLog');
const PDFDocument = require('pdfkit');

exports.generateWeeklyReport = async (req, res) => {
    const userId = parseInt(req.params.userId);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    try {
        const user = await User.findOne({ userId }).lean();
        if (!user) return res.status(404).json({ message: 'User not found' });

        const empInfo = await EmployeeInfo.findOne({ userId }).lean();

        const tasks = await Task.find({
            assigned_to: userId,
            due_date: { $gte: oneWeekAgo }
        }).lean();

        const projectIds = tasks.map(t => t.project_id);
        const projects = await Project.find({ project_id: { $in: projectIds } }).lean();

        const attendanceLogs = await AttendanceLog.find({
            userId,
            activity: { $in: ['checkin', 'checkout'] },
            activity_time: { $gte: oneWeekAgo }
        }).sort({ activity_time: 1 }).lean();

        const doc = new PDFDocument({ margin: 50 });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=Weekly_Report_User_${userId}.pdf`);
        doc.pipe(res);

        // Title
        doc.fontSize(22).font('Helvetica-Bold').fillColor('#0a2256').text('Weekly Employee Progress Report', {
            align: 'center',
            underline: true,
        });
        doc.moveDown(1.5);

        // User Info Section
        doc.fontSize(16).font('Helvetica-Bold').fillColor('black').text('Employee Information', { underline: true }).moveDown(0.5);
        doc.font('Helvetica-Bold').fontSize(12);
        doc.text(`Name: `, { continued: true }).font('Helvetica').text(`${user.firstName} ${user.lastName}`);
        doc.font('Helvetica-Bold').text(`Username: `, { continued: true }).font('Helvetica').text(user.username);
        doc.font('Helvetica-Bold').text(`Email: `, { continued: true }).font('Helvetica').text(user.email);
        doc.font('Helvetica-Bold').text(`User ID: `, { continued: true }).font('Helvetica').text(user.userId.toString());
        doc.font('Helvetica-Bold').text(`Designation: `, { continued: true }).font('Helvetica').text(empInfo?.designation || 'N/A');
        doc.moveDown(1.5);

        // Task Section
        doc.fontSize(16).fillColor('black').font('Helvetica-Bold').text('Tasks Assigned This Week', { underline: true }).moveDown(0.5);

        if (tasks.length === 0) {
            doc.font('Helvetica').text('No tasks assigned this week.');
        } else {
            tasks.forEach((task, index) => {
                const project = projects.find(p => p.project_id === task.project_id);
                doc.fontSize(12).font('Helvetica-Bold').text(`Task ${index + 1}`);
                doc.font('Helvetica').text(`• Task ID: ${task.task_id}`);
                doc.text(`• Title: ${task.task_name}`);
                doc.text(`• Description: ${task.task_description}`);
                doc.text(`• Status: ${task.status}`);
                doc.text(`• Project: ${project?.title || 'N/A'} (ID: ${task.project_id})`);
                doc.text(`• Due Date: ${task.due_date?.toDateString()}`);
                doc.text(`• Submission Date: ${task.submission_date ? task.submission_date.toDateString() : 'N/A'}`);
                doc.moveDown(1);
            });
        }

        // Attendance Section
        doc.fontSize(16).font('Helvetica-Bold').fillColor('black').text(' Attendance Logs (Last 7 Days)', { underline: true }).moveDown(0.5);

        if (attendanceLogs.length === 0) {
            doc.font('Helvetica').text('No attendance logs found.');
        } else {
            const startX = doc.x;
            const activityColWidth = 100;
            const timestampColX = startX + activityColWidth + 20;

            // Manually set the Y position for headers to keep them aligned
            const headerY = doc.y;
            doc.font('Helvetica-Bold').fontSize(12);
            doc.text('Activity', startX, headerY);
            doc.text('Timestamp', timestampColX, headerY);
            doc.moveDown(1); // Add space below header

            // Content Rows
            doc.font('Helvetica').fontSize(12);
            attendanceLogs.forEach(log => {
                const activity = log.activity.toUpperCase();
                const timestamp = new Date(log.activity_time).toLocaleString();

                const rowY = doc.y;
                doc.text(activity, startX, rowY);
                doc.text(timestamp, timestampColX, rowY);
                doc.moveDown(0.5);
            });
        }

        doc.end();
    } catch (err) {
        console.error('Error generating report:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
