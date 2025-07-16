const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({

    userId: { type: Number, unique: true},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    contact : { type: String, required: true },
    password: { type: String, required: true },
    role: {
        type: String, required: true,
        enum: ['admin', 'employee', 'manager'],
    }

});

// Auto-increment userId
userSchema.plugin(AutoIncrement, { inc_field: 'userId' });

module.exports = mongoose.model('users', userSchema);