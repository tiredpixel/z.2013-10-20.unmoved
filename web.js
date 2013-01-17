/*
 * unmoved
 */

var url = require('url');


// Set up server (Node.js Express).

var express = require('express');
var app     = express();

app.use(express.bodyParser());


// Connect to Redis.

var redis = require('redis-url').connect(process.env.REDIS_URL);


// Define routes.

var checkOrigin = function(req, res, next) {
  var origin = url.parse(req.headers.origin);
  
  if (origin.host == process.env.REMOTE_HOST) {
    next();
  }
}

app.all('/*', checkOrigin);

require('./app/controllers/objects')(app, redis, url);


// Run server.

var port = process.env.PORT;

app.listen(port, function() {
  console.log('[server]', 'listening on ' + port);
});
