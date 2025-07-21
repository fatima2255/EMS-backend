const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const projectSchema = new mongoose.Schema({
    project_id: {type: Number, unique: true},
    title: { type: String, required: true },
    description: { type: String, required: true },
});


// Auto-increment project_id
projectSchema.plugin(AutoIncrement, { inc_field: 'project_id' });
module.exports = mongoose.model('projects', projectSchema);