const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assignment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    testResults: [{
        testCase: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Assignment.testCases'
        },
        passed: Boolean,
        output: String,
        error: String
    }],
    grade: {
        score: Number,
        maxScore: Number,
        feedback: String,
        gradedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        gradedAt: Date
    },
    submittedAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['draft', 'submitted', 'graded', 'late'],
        default: 'draft'
    }
});

// Calculate submission status based on due date
submissionSchema.pre('save', function(next) {
    if (this.status === 'submitted' && this.assignment.dueDate < new Date()) {
        this.status = 'late';
    }
    next();
});

module.exports = mongoose.model('Submission', submissionSchema); 