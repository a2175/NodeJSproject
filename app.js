var http = require('http');
var fs = require('fs');
var url = require('url');
var express = require('express');

global._ROOT = __dirname + "/";
global._APP = _ROOT + "js/";
global._RESOURCES = _ROOT + "resources/";
global._IMG = _ROOT + "resources/img/";
global._CSS = _ROOT + "resources/css/";
global._JS = _ROOT + "resources/js/";

function isset(variable) {
  return typeof(variable) != "undefined" && variable !== null;
}

function getParam(url){
  var get = [];
  if(isset(url)){
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
app.use('/resources', express.static('resources'));

app.get('/favicon.ico', function(request, response){
  response.send(404);
});

app.get('/*', function(request, response){
  var _url = request.url;
  var pathname = url.parse(_url, true).pathname;
  var param = getParam(pathname);

  fs.readdir('./js', function(error, filelist) {
    if(filelist.includes(param['page_type'])) {
      console.log("url: "+pathname);
      var controllerName = param['page_type'] + 'Controller';
      controllerName = controllerName[0].toUpperCase() + controllerName.substring(1);

      var dir = _APP + param['page_type'] + '/controller/' + controllerName;
      console.log("dir is: "+ dir);

      var loadController = require(dir);
      controller = new loadController(param);

      response.send(controller.getView());
    }
    else {
      response.send('404 Not Found');
    }
  });
});

app.listen(3001, function(){
    console.log('server start!');
});
