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
  global.getParam = function getParam(url) {
    var get = [];
    if (isset(url)) {
      get = url.substring(1).split("/");
    }
    var param = {};
    param.page_type = isset(get[0]) && get[0] != '' ? get[0] : 'main';
    param.action = isset(get[1]) && get[1] != '' ? get[1] : null;
    param.idx = isset(get[2]) && get[2] != '' ? get[2] : null;
    param.page_num = isset(get[2]) && get[2] != '' ? get[2] : 1;
    param.keyword = isset(get[3]) && get[3] != '' ? get[3] : null;
    param.include_file = isset(param.action) ? param.action : param.page_type;
    //param['get_page'] = _URL."{param['page_type']}";
    return param;
  }
}()
