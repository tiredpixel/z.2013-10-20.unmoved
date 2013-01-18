
var db     = require('./../db');
var config = require('./../config');

/**
 * GET /pages/:page_id/objects/:object_id
 */
exports.show = function(req, res) {
  if (typeof req.params.page_id !== 'undefined' && req.params.page_id &&
      typeof req.params.object_id !== 'undefined' && req.params.object_id) {
    var key = config.REDIS_KEY_PREFIX + req.params.page_id;
    
    db.hget(key, req.params.object_id, function(err, value) {
      if (!err) {
        if (typeof req.headers.origin !== 'undefined') {
          res.header('Access-Control-Allow-Origin', req.headers.origin);
        }
        
        res.send(JSON.parse(value));
      }
    });
  }
}


/**
 * POST /pages/:page_id/objects/:object_id
 */
exports.update = function(req, res) {
  if (typeof req.params.page_id !== 'undefined' && req.params.page_id &&
      typeof req.params.object_id !== 'undefined' && req.params.object_id &&
      typeof req.body !== 'undefined' && req.body) {
    var key = config.REDIS_KEY_PREFIX + req.params.page_id;
    
    var data = {};
    
    for (var field in req.body) {
      if (req.body.hasOwnProperty(field)) {
        data[field] = parseInt(req.body[field]);
      }
    }
    
    db.hset(key, req.params.object_id, JSON.stringify(data));
    
    if (typeof req.headers.origin !== 'undefined') {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
    }
    
    res.send();
  }
}
