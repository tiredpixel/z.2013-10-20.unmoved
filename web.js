var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('unmoved\n');
}).listen(process.env.PORT, '0.0.0.0');

console.log('server running at http://0.0.0.0:' + process.env.PORT + '/');
