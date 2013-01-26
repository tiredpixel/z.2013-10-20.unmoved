
var db     = require('./../db')(process.env);
var config = require('./../config')(process.env);

/**
 * GET /pages/:page_id/objects/:object_id
 */
exports.show = function (req, res) {
  'use strict';
  
  if (req.params.page_id !== undefined && req.params.page_id &&
      req.params.object_id !== undefined && req.params.object_id) {
    var key = config.REDIS_KEY_PREFIX + req.params.page_id;
    
    db.hget(key, req.params.object_id, function (err, value) {
      if (!err) {
        if (req.headers.origin !== undefined) {
          res.header('Access-Control-Allow-Origin', req.headers.origin);
        }
        
        res.send(JSON.parse(value));
      }
    });
  }
};


/**
 * POST /pages/:page_id/objects/:object_id
 */
exports.update = function (req, res) {
  'use strict';
  
  if (req.params.page_id !== undefined && req.params.page_id &&
      req.params.object_id !== undefined && req.params.object_id &&
      req.body !== undefined && req.body) {
    var key = config.REDIS_KEY_PREFIX + req.params.page_id;
    
    var data = {};
    
    var field;
    
    for (field in req.body) {
      if (req.body.hasOwnProperty(field)) {
        data[field] = parseInt(req.body[field], 10);
      }
    }
    
    db.hset(key, req.params.object_id, JSON.stringify(data));
    
    if (req.headers.origin !== undefined) {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
    }
    
    res.send();
  }
};
