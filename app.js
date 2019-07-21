var http = require('http');
var fs = require('fs');
var url = require('url');
var ip = require("ip");
var bodyParser = require('body-parser')
var express = require('express');

global.PORT = 3001;
global._ROOT = __dirname + "/";
global._APP = _ROOT + "js/";
global._VIEW = _ROOT + "views/";
global._RESOURCES = _ROOT + "resources/";
global._CONFIG = _APP + "config/";
global._URL = "http://" + ip.address() + ":" + PORT + "/";
global._IMG = _URL + "resources/img/";
global._CSS = _URL + "resources/css/";
global._JS = _URL + "resources/js/";

var lib = require(_CONFIG + "/lib"); // custom global function

app = express();
app.locals.pretty = true;
app.locals.basedir = _ROOT + 'views';
app.set('view engine', 'pug');
app.set('views', './views');
app.use('/resources', express.static('resources'));
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/favicon.ico', function(request, response) {
  response.sendStatus(404);
});

var callback = function(request, response) {
  var _url = request.url;
  var pathname = url.parse(_url, true).pathname;
  var param = getParam(pathname);

  fs.readdir('./js', function(error, filelist) {
    if (filelist.includes(param.page_type)) {
      console.log("url: " + pathname);
      var controllerName = param.page_type + 'Controller';
      controllerName = controllerName[0].toUpperCase() + controllerName.substring(1);

      var controllerPath = _APP + param.page_type + '/controller/' + controllerName;
      console.log("controllerPath is: " + controllerPath);

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
