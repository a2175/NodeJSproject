var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

global.PORT = 3001;
global._ROOT = __dirname + "/";
global._APP = _ROOT + "application/";
global._VIEW = _ROOT + "views/";
global._RESOURCES = _ROOT + "resources/";
global._SERVICE = _APP + "service/";
global._DAO = _APP + "dao/";
global._ROUTES = _APP + "routes/";
global._CONFIG = _APP + "config/";

require(_CONFIG + "lib"); // custom global function

var app = express();
var server = http.createServer(app);
app.locals.pretty = true;
app.locals.basedir = _ROOT + 'views';
app.set('view engine', 'pug');
app.set('views', './views');
app.use('/resources', express.static(_ROOT + 'resources'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

global._ROUTE_POST = "/post";
global._ROUTE_COMMENT = "/comment";
global._ROUTE_FILE = "/file";
global._ROUTE_CHAT = "/chat";

app.use(_ROUTE_POST, require(_ROUTES + 'boardRoute'));
app.use(_ROUTE_COMMENT, require(_ROUTES + 'commentRoute'));
app.use(_ROUTE_FILE, require(_ROUTES + 'fileRoute'));
app.use(_ROUTE_CHAT, require(_ROUTES + 'chatRoute')(server));

app.get('/', function(request, response) {
  response.render(_VIEW + 'main/main');
});

app.get('*', function(request, response) {
  response.status(404).send('404 Not Found');
});

server.listen(PORT, function() {
  console.log(`server listening on port ${PORT}`);
});
