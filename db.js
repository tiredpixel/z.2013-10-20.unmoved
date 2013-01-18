var redis = require('redis-url');

var config = require('./config');

var db = redis.connect(config.REDIS_URL);

if (typeof config.REDIS_URL !== 'undefined') {
  var matches = config.REDIS_URL.match(/\/(\d+)$/);
  
  if (matches && typeof matches[1] !== 'undefined') {
    var dbnum = matches[1];
    
    db.select(dbnum);
  }
}

module.exports = db;
