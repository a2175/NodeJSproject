var db = require(_CONFIG + "database");

module.exports = function CommentController (request, response, param) {
  var connection = db.getDB();

  if(isset(request.body.request)) {
    switch(request.body.request) {
      case 'insert' : insertComment(); break;
      case 'delete' : deleteComment(); break;
    }
  }
  else {
    switch (param.action) {
      case 'view' : selectCommentList(); break;
    }
  }

  function selectCommentList() {
    var action = function() {
      var sql = "SELECT * FROM comment WHERE board_idx = ? ORDER BY idx";
      var params = [param.idx];

      connection.query(sql, params, function (error, results, fields) {
        var list = db.toJSON(results);
        var data = {
          list: list,
          totalCount: list.length
        };
        response.send(data);
      });
    };

    db.dbAction(action, connection);
  }

  function insertComment() {
    var action = function() {
      var sql = "INSERT INTO comment SET name = ?, pw = ?, content = ?, board_idx = ?, date=now()";
      var formData = request.body;
      var params = [formData.name, formData.pw, formData.content, param.idx];

      connection.query(sql, params, function (error, results, fields) {
          response.end();
      });
    };

    db.dbAction(action, connection);
  }


  function deleteComment() {
    var action = function() {
      var sql = "DELETE FROM comment WHERE idx = ? AND pw = ?";
      var formData = request.body;
      var params = [param.idx, formData.pw];

      connection.query(sql, params, function (error, results, fields) {
        var isDeleted = String(results.affectedRows);
        response.send(isDeleted);
      });
    };

    db.dbAction(action, connection);
  }
}
