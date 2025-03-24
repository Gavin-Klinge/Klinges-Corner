require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const mongoSanitize = require('mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

// Import configurations
const { logger, stream } = require('./config/logger');
const { redis } = require('./config/redis');
const errorHandler = require('./middleware/errorHandler');
const { authLimiter, apiLimiter, submissionLimiter } = require('./middleware/rateLimiter');

// Import routes
const authRoutes = require('./routes/auth');
const classRoutes = require('./routes/classes');
const assignmentRoutes = require('./routes/assignments');
const submissionRoutes = require('./routes/submissions');
const fileRoutes = require('./routes/files');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// Security middleware
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true
}));
app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Performance middleware
app.use(compression());
app.use(morgan('combined', { stream }));

// Rate limiting
app.use('/api/auth', authLimiter);
app.use('/api/submissions', submissionLimiter);
app.use('/api', apiLimiter);

// Database connection with retry
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/klinges-corner', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        logger.info('Connected to MongoDB');
    } catch (error) {
        logger.error('MongoDB connection error:', error);
        setTimeout(connectDB, 5000);
    }
};

connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/files', fileRoutes);

// Socket.IO for real-time collaboration
io.on('connection', (socket) => {
    logger.info('New client connected');

    socket.on('join-room', (roomId) => {
        socket.join(roomId);
        logger.info(`Client joined room: ${roomId}`);
    });

    socket.on('code-change', (data) => {
        socket.to(data.roomId).emit('code-update', data.code);
        logger.debug(`Code update in room: ${data.roomId}`);
    });

    socket.on('disconnect', () => {
        logger.info('Client disconnected');
    });
});

// Error handling
app.use(errorHandler);

// Graceful shutdown
process.on('SIGTERM', () => {
    logger.info('SIGTERM received. Shutting down gracefully...');
    server.close(() => {
        logger.info('Process terminated!');
        mongoose.connection.close(false, () => {
            process.exit(0);
        });
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
}); 