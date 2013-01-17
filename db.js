var redis = require('redis-url');

module.exports = redis.connect(process.env.REDIS_URL);
