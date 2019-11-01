module.exports = function() {
  global.isset = function isset(variable) {
    return typeof(variable) != "undefined" && variable !== null;
  }
}()
