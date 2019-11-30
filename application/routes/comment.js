var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var mydb = require(_CONFIG + "database");

var connection = mysql.createConnection(mydb.dbSet);

router.get('/:post_idx', function(request, response) {
  var sql = "SELECT * FROM comment WHERE board_idx = ? ORDER BY idx";
  var params = [request.params.post_idx];

  connection.query(sql, params, function (error, results, fields) {
    var list = mydb.toJSON(results);
    var data = {
      list: list,
      totalCount: list.length
    };
    response.send(data);
  });
});

router.post('/:post_idx', function(request, response) {
  var sql = "INSERT INTO comment SET name = ?, pw = ?, content = ?, board_idx = ?, date=now()";
  var formData = request.body;
  var params = [formData.name, formData.pw, formData.content, request.params.post_idx];

  connection.query(sql, params, function (error, results, fields) {
      response.end();
  });
});

router.delete('/:idx', function(request, response) {
  var sql = "DELETE FROM comment WHERE idx = ? AND pw = ?";
  var formData = request.body;
  var params = [request.params.idx, formData.pw];

  connection.query(sql, params, function (error, results, fields) {
    var isDeleted = String(results.affectedRows);
    response.send(isDeleted);
  });
});

module.exports = router;
