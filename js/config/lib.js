module.exports = function() {
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
    param.get_page = _URL + param.page_type;
    return param;
  }
}()