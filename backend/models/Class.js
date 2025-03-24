const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    assignments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment'
    }],
    schedule: {
        startDate: Date,
        endDate: Date,
        meetingDays: [String],
        meetingTime: String
    },
    code: {
        type: String,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Generate unique class code before saving
classSchema.pre('save', async function(next) {
    if (!this.isModified('code')) {
        const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        this.code = randomCode;
    }
    next();
});

module.exports = mongoose.model('Class', classSchema); 