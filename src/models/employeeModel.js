const { required } = require('joi');
const mongoose = require('mongoose');

const employeeInfoSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
        unique: true,
        ref: 'users'
    },
    address: { type: String, required: true },
    designation: { type: String, required: true },
    salaryPerMonth: { type: Number, required: true },
    managerId: { type: Number, ref: 'users', required: false },
    isManager: { type: Boolean, default: false},
    profile_completed: { type: Boolean, default: false }
}, {
    timestamps: true
});

module.exports = mongoose.model('employee_info', employeeInfoSchema);