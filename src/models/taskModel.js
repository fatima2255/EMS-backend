const { allow } = require('joi');
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const taskSchema = new mongoose.Schema({
    project_id: {
        type: Number,
        required: true,
        ref: 'projects'
    },
    task_id: { type: Number, unique: true },
    task_name: { type: String, required: true },
    task_description: { type: String, required: true },
    assigned_to: { type: Number, ref: 'users', required: true },
    assigned_by: { type: Number, ref: 'users', required: true },
    due_date: { type: Date, required: true },
    submission_date: { type: Date, required: false},
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
});

// Auto-increment task_id
taskSchema.plugin(AutoIncrement, { inc_field: 'task_id' });
module.exports = mongoose.model('tasks', taskSchema);
