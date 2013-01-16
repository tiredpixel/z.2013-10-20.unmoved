module.exports = function (app, redis) {
  
  // POST /pages/:page_id/objects/:object_id
  app.post('/pages/:page_id/objects/:object_id', function (req, res) {
    if (req.params.page_id && req.params.object_id && req.body) {
      var key = process.env.REDIS_KEY_PREFIX + req.params.page_id;
      
      var data = {};
      
      for (var field in req.body) {
        if (req.body.hasOwnProperty(field)) {
          data[field] = parseInt(req.body[field]);
        }
      }
      
      redis.hset(key, req.params.object_id, JSON.stringify(data));
      
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.send();
      
      console.log('[POST ' + req.originalUrl + ']', key, data);
    }
  });
  
  // GET /pages/:page_id/objects
  app.get('/pages/:page_id/objects', function (req, res) {
    if (req.params.page_id) {
      var key = process.env.REDIS_KEY_PREFIX + req.params.page_id;
      
      redis.hgetall(key, function (err, values) {
        if (!err) {
          var data = {};
          
          for (var field in values) {
            if (values.hasOwnProperty(field)) {
              data[field] = JSON.parse(values[field]);
            }
          }
          
          res.header('Access-Control-Allow-Origin', req.headers.origin);
          res.send(data);
          
          console.log('[GET ' + req.originalUrl + ']', key);
        }
      });
    }
  });
  
}
