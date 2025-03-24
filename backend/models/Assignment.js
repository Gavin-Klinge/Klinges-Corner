const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    submissionType: {
        type: String,
        enum: ['code', 'file', 'text'],
        required: true
    },
    language: {
        type: String,
        enum: ['python', 'javascript', 'html', 'css', 'c', 'text'],
        required: true
    },
    testCases: [{
        name: String,
        input: String,
        expectedOutput: String,
        points: Number
    }],
    maxPoints: {
        type: Number,
        required: true
    },
    submissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Submission'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Index for querying assignments by due date
assignmentSchema.index({ dueDate: 1 });

module.exports = mongoose.model('Assignment', assignmentSchema); 