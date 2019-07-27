var mysql = require('mysql');

module.exports = new function() {
  this.getDB = function() {
    return connection = mysql.createConnection({
      host: 'localhost',
      port: '3307',
      user: 'root',
      password: '000000',
      database: 'mydb',
      multipleStatements: true
    });
  }

  this.toJSON = function toJSON(rows) {
    return JSON.parse(JSON.stringify(rows));
  }

  this.dbAction = function dbAction(action, db) {
    db.connect();
    action();
    db.end();
  }
}
