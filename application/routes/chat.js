var mysql = require('mysql');
var mydb = require(_CONFIG + "database");
var express = require('express');
var router = express.Router();

var connection = mysql.createConnection(mydb.dbSet);

module.exports = function(server)  {
  router.get('/', function(request, response) {
    response.render(_VIEW + 'chat/chat');
  });

  var io = require('socket.io')(server);

  io.on('connection', function(socket) {

    socket.on('list', function(data) {
      var sql = "SELECT * FROM chat";

      connection.query(sql, function (error, results, fields) {
        var data = mydb.toJSON(results);
        io.emit('list', data);
      });
    });

    socket.on('insert', function(data) {
      var sql = "INSERT INTO chat SET name = ?, content = ?, date=now();";
      var params = [data.name, data.content];

      connection.query(sql, params, function (error, results, fields) {
        io.emit('update', data);
      });
    });

  });

	return router;
};
