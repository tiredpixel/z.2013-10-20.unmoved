
module.exports = function (env) {
  'use strict';
  
  var redis = require('redis-url');
  
  var config = require('./config')(env);
  
  var db = redis.connect(config.REDIS_URL);
  
  if (config.REDIS_URL !== undefined) {
    var matches = config.REDIS_URL.match(/\/(\d+)$/);
    
    if (matches && matches[1] !== undefined) {
      var dbnum = matches[1];
      
      db.select(dbnum);
    }
  }
  
  return db;
};
