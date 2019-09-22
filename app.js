var http = require('http');
var url = require('url');
var qs = require('querystring');
var fs = require('fs');
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser')

global.PORT = 3001;
global._ROOT = __dirname + "/";
global._APP = _ROOT + "application/";
global._VIEW = _ROOT + "views/";
global._RESOURCES = _ROOT + "resources/";
global._ROUTES = _APP + "routes/";
global._CONFIG = _APP + "config/";

var lib = require(_CONFIG + "lib"); // custom global function

var app = express();
var server = http.createServer(app);
app.locals.pretty = true;
app.locals.basedir = _ROOT + 'views';
app.set('view engine', 'pug');
app.set('views', './views');
app.use('/resources', express.static('resources'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/favicon.ico', function(request, response) {
  response.sendStatus(404);
});

var io;
app.get('/chat', function(request, response) {
  response.render(_VIEW + 'chat/chat');
  if(io == undefined) {
    io = require('socket.io')(server);
    require(_ROUTES + 'chat')(io);
  }
});

var callback = function(request, response) {
  var _url = qs.unescape(request.url);
  var pathname = url.parse(_url, true).pathname;
  var param = getParam(pathname);

  fs.readdir(_ROUTES, function(error, filelist) {
    if(filelist.includes(param.page_type + ".js")) {
      var route = require(_ROUTES + param.page_type);
      route(request, response, param);
    } else {
      response.send('404 Not Found');
    }
  });
};

app.get('/*', callback);
app.post('/*', callback);

server.listen(PORT, function() {
  console.log(`server listening on port ${PORT}`);
});
