var redis = require('redis-url');

var config = require('./config');

module.exports = redis.connect(config.REDIS_URL);
