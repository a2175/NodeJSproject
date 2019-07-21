var mysql = require('sync-mysql');

module.exports = function() {
  var db = new mysql({
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: '000000',
    database: 'mydb'
  });
  return db;
}()
