
/**
 * unmoved
 */

var express = require('express');
var http    = require('http');
var url     = require('url');

var config = require('./config')(process.env);

// Set up server (Node.js Express).

var app = express();

app.configure(function () {
  'use strict';
  
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function () {
  'use strict';
  
  app.use(express.errorHandler());
  app.use(express.static(__dirname));
});


// Define routes.

var pages_objects = require('./routes/pages_objects');

var checkOrigin = function (req, res, next) {
  'use strict';
  
  if (req.headers.origin !== undefined) {
    var origin = url.parse(req.headers.origin);
    
    if (config.REMOTE_HOST === undefined ||
        (origin.host !== undefined &&
        origin.host === config.REMOTE_HOST)) {
      next();
    }
  }
};

var pages_objectsBefore = function (req, res, next) {
  'use strict';
  
  if (req.params.page_id !== undefined) {
    var page_id = url.parse(req.params.page_id);
    
    if (config.REMOTE_HOST === undefined ||
        (page_id.host !== undefined &&
        page_id.host === config.REMOTE_HOST)) {
      next();
    }
  }
};

app.configure('production', function () {
  'use strict';
  
  app.all('/*', checkOrigin);
});

app.all('/pages/:page_id/objects*', pages_objectsBefore);

app.post('/pages/:page_id/objects/:object_id', pages_objects.update);
app.get('/pages/:page_id/objects/:object_id',  pages_objects.show);


// Run server.

http.createServer(app).listen(config.PORT, function () {
  'use strict';
  
  console.log('config', JSON.stringify(config));
  
  console.log('server', 'listening on ' + config.PORT);
});
