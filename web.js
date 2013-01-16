/*
 * unmoved
 */


// Set up server (Node.js Express).

var express = require('express');
var app     = express();

app.use(express.bodyParser());


// Connect to Redis.

var redis = require('redis-url').connect(process.env.REDIS_URL);


// Define routes.

require('./app/controllers/objects')(app, redis);


// Run server.

var port = process.env.PORT;

app.listen(port, function () {
  console.log('[server]', 'listening on ' + port);
});
