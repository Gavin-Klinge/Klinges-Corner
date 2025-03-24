const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per window
    message: 'Too many login attempts, please try again after 15 minutes'
});

const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100, // 100 requests per minute
    message: 'Too many requests, please try again later'
});

const submissionLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10, // 10 submissions per minute
    message: 'Too many submissions, please wait before trying again'
});

module.exports = { authLimiter, apiLimiter, submissionLimiter }; 