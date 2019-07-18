var ip = require("ip");

module.exports = function() {
  global.port = 3001;
  global._ROOT = __dirname + "/";
  global._APP = _ROOT + "js/";
  global._VIEW = _ROOT + "views/";
  global._RESOURCES = _ROOT + "resources/";
  global._URL = "http://" + ip.address() + ":" + port + "/";
  global._IMG = _URL + "resources/img/";
  global._CSS = _URL + "resources/css/";
  global._JS = _URL + "resources/js/";
  global.isset = function isset(variable) {
    return typeof(variable) != "undefined" && variable !== null;
  }
}()
