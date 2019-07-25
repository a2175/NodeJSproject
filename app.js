var http = require('http');
var url = require('url');
var qs = require('querystring');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser')

global.PORT = 3001;
global._ROOT = __dirname + "/";
global._APP = _ROOT + "js/";
global._VIEW = _ROOT + "views/";
global._RESOURCES = _ROOT + "resources/";
global._CONFIG = _APP + "config/";

var lib = require(_CONFIG + "/lib"); // custom global function

app = express();
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

var callback = function(request, response) {
  var _url = qs.unescape(request.url);
  var pathname = url.parse(_url, true).pathname;
  var param = getParam(pathname);

  fs.readdir('./js', function(error, filelist) {
    if (filelist.includes(param.page_type)) {
      //console.log(request.get('host'));
      //console.log("pathname: " + pathname);
      var controllerName = param.page_type + 'Controller';
      controllerName = controllerName[0].toUpperCase() + controllerName.substring(1);

      var controllerPath = _APP + param.page_type + '/controller/' + controllerName;
      //console.log("controllerPath is: " + controllerPath);

      var controllerClass = require(controllerPath);
      var controller = new controllerClass(request, response, param);
      controller.respondView();
    } else {
      response.send('404 Not Found');
    }
  });
};

app.get('/*', callback);
app.post('/*', callback);

app.listen(PORT, function() {
  console.log('server start!');
});
