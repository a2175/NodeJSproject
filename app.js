var http = require('http');
var express = require('express');
var bodyParser = require('body-parser')
var methodOverride = require('method-override');

global.PORT = 3001;
global._ROOT = __dirname + "/";
global._APP = _ROOT + "application/";
global._VIEW = _ROOT + "views/";
global._RESOURCES = _ROOT + "resources/";
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
app.use(methodOverride('_method'));

app.use('/board', require(_ROUTES + 'board'));
app.use('/comment', require(_ROUTES + 'comment'));
app.use('/chat', require(_ROUTES + 'chat')(server));

app.get('/', function(request, response) {
  response.render(_VIEW + 'main/main');
});

server.listen(PORT, function() {
  console.log(`server listening on port ${PORT}`);
});
