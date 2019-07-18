var http = require('http');
var fs = require('fs');
var url = require('url');
var express = require('express');

var _global = require("./global"); // custom global variable and function

function getParam(url) {
  var get = [];
  if (isset(url)) {
    get = url.substring(1).split("/");
  }
  var param = [];
  param['page_type'] = isset(get[0]) && get[0] != '' ? get[0] : 'main';
  param['action'] = isset(get[1]) && get[1] != '' ? get[1] : null;
  param['idx'] = isset(get[2]) && get[2] != '' ? get[2] : null;
  param['page_num'] = isset(get[2]) && get[2] != '' ? get[2] : 1;
  param['keyword'] = isset(get[3]) && get[3] != '' ? get[3] : null;
  param['include_file'] = isset(param['action']) ? param['action'] : param['page_type'];
  //param['get_page'] = _URL."{param['page_type']}";
  return param;
}

app = express();
app.locals.pretty = true;
app.locals.basedir = _ROOT + 'views';
app.set('view engine', 'pug');
app.set('views', './views');
app.use('/resources', express.static('resources'));

app.get('/favicon.ico', function(request, response) {
  response.sendStatus(404);
});

app.get('/*', function(request, response) {
  var _url = request.url;
  var pathname = url.parse(_url, true).pathname;
  var param = getParam(pathname);

  fs.readdir('./js', function(error, filelist) {
    if (filelist.includes(param['page_type'])) {
      console.log("url: " + pathname);
      var controllerName = param['page_type'] + 'Controller';
      controllerName = controllerName[0].toUpperCase() + controllerName.substring(1);

      var controllerPath = _APP + param['page_type'] + '/controller/' + controllerName;
      console.log("controllerPath is: " + controllerPath);

      var controllerClass = require(controllerPath);
      var controller = new controllerClass(request, response, param);
      controller.respondView();
    } else {
      response.send('404 Not Found');
    }
  });
});

app.listen(port, function() {
  console.log('server start!');
});
