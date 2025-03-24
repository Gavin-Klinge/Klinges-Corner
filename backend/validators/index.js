const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required(),
    role: Joi.string().valid('student', 'teacher', 'admin').required()
});

const classSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    description: Joi.string().max(500),
    schedule: Joi.object({
        startDate: Joi.date().required(),
        endDate: Joi.date().min(Joi.ref('startDate')).required(),
        meetingDays: Joi.array().items(Joi.string().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday')),
        meetingTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    })
});

const assignmentSchema = Joi.object({
    title: Joi.string().min(2).max(200).required(),
    description: Joi.string().required(),
    dueDate: Joi.date().min('now').required(),
    submissionType: Joi.string().valid('code', 'file', 'text').required(),
    language: Joi.string().valid('python', 'javascript', 'html', 'css', 'c', 'text').required(),
    maxPoints: Joi.number().min(0).required(),
    testCases: Joi.array().items(
        Joi.object({
            name: Joi.string().required(),
            input: Joi.string().required(),
            expectedOutput: Joi.string().required(),
            points: Joi.number().min(0).required()
        })
    )
});

const submissionSchema = Joi.object({
    content: Joi.string().required(),
    language: Joi.string().valid('python', 'javascript', 'html', 'css', 'c', 'text').required()
});

const gradeSchema = Joi.object({
    score: Joi.number().min(0).required(),
    feedback: Joi.string().max(1000)
});

module.exports = {
    userSchema,
    classSchema,
    assignmentSchema,
    submissionSchema,
    gradeSchema
}; 