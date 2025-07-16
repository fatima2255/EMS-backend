const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
require('dotenv').config();
const app = express();

//routes
const userRoutes = require('./src/routes/userRoute');
const resetRoutes = require('./src/routes/resetRoute');
const employeeRoutes = require('./src/routes/employeeRoute');
const attendanceRoutes = require('./src/routes/attendanceRoute');

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/auth', userRoutes); // User routes
app.use('/api', resetRoutes); // Password reset routes
app.use('/api/employees', employeeRoutes); // Employee routes
app.use('/api/attendance', attendanceRoutes); // Attendance routes



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});