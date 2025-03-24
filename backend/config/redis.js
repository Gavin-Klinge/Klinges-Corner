const Redis = require('ioredis');

const redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD,
    retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
    }
});

redis.on('error', (err) => {
    console.error('Redis connection error:', err);
});

redis.on('connect', () => {
    console.log('Connected to Redis');
});

const cache = {
    async get(key) {
        try {
            const data = await redis.get(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Cache get error:', error);
            return null;
        }
    },

    async set(key, value, ttl = 3600) {
        try {
            await redis.set(key, JSON.stringify(value), 'EX', ttl);
        } catch (error) {
            console.error('Cache set error:', error);
        }
    },

    async del(key) {
        try {
            await redis.del(key);
        } catch (error) {
            console.error('Cache delete error:', error);
        }
    },

    async clear() {
        try {
            await redis.flushall();
        } catch (error) {
            console.error('Cache clear error:', error);
        }
    }
};

module.exports = { redis, cache }; 