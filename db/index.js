var low = require('lowdb');
var db = low('./admin/data/db.json');

db('posts').push({ title: 'lowdb is awesome?'});

// HELLO WORLD
var http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('Hello Http');
});
server.listen(8080);