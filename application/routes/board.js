var db = require(_CONFIG + "database");

module.exports = function BoardController (request, response, param) {
  var connection = db.getDB();

  if(isset(request.body.request)) {
    switch(request.body.request) {
      case 'insert' : insertBoard(); break;
      case 'update' : updateBoard(); break;
      case 'delete' : deleteBoard(); break;
    }
  }
  else {
    switch (param.action) {
      case 'view' : openBoardDetail(); break;
      case 'write' : openBoardWrite(); break;
      case 'update' : openBoardUpdate(); break;
      case 'delete' : openBoardDelete(); break;
      case 'searchpage' : openBoardSearchList(); break;
      default : openBoardList(); break;
    }
  }

  function openBoardList() {
    var action = function() {
      var nPageIndex = param.page_num - 1;
      var nPageRow = 15;

      var START = nPageIndex * nPageRow;
      var END = nPageRow;

      var sql1 = "SELECT * FROM board ORDER BY idx DESC LIMIT ?, ?;";
      var sql2 = "SELECT count(*) AS count FROM board";
      var params = [START, END];

      connection.query(sql1 + sql2, params, function (error, results, fields) {
        var data = {
          list: db.toJSON(results[0]),
          listNum: results[1][0].count
        };
        response.render(_VIEW + 'board/boardList', {data : data, param : param});
      });
    };

    db.dbAction(action, connection);
  }

  function openBoardSearchList() {
    var action = function() {
      var nPageIndex = param.page_num - 1;
      var nPageRow = 15;

      var START = nPageIndex * nPageRow;
      var END = nPageRow;

      var sql1 = "SELECT * FROM board WHERE subject LIKE CONCAT('%', ?, '%') ORDER BY idx DESC LIMIT ?, ?;";
      var sql2 = "SELECT count(*) AS count FROM board WHERE subject LIKE CONCAT('%', ?, '%')";
      var params = [param.keyword, START, END, param.keyword];

      connection.query(sql1 + sql2, params, function (error, results, fields) {
        var data = {
          list: db.toJSON(results[0]),
          listNum: results[1][0].count
        };
        response.render(_VIEW + 'board/boardList', {data : data, param : param});
      });
    };

    db.dbAction(action, connection);
  }

  function openBoardDetail() {
    var action = function() {
      var sql = "SELECT * FROM board WHERE idx = ?";
      var params = [param.idx];

      connection.query(sql, params, function (error, results, fields) {
        var data = db.toJSON(results)[0];
        response.render(_VIEW + 'board/boardDetail', {data : data});
      });
    };

    db.dbAction(action, connection);
  }

  function openBoardWrite() {
    response.render(_VIEW + 'board/boardWrite');
  }

  function insertBoard() {
    var action = function() {
      var sql = 'INSERT INTO board SET name = ?, pw = ?, subject = ?, content = ?, date=now()';
      var formData = request.body;
      var params = [formData.name, formData.pw, formData.subject, formData.content];

      connection.query(sql, params, function (error, results, fields) {
        response.render(_VIEW + 'common/redirect', {msg : "완료되었습니다.", url : "/board"});
      });
    };

    db.dbAction(action, connection);
  }

  function openBoardUpdate() {
    var action = function() {
      var sql = "SELECT * FROM board WHERE idx = ?";
      var params = [param.idx];

      connection.query(sql, params, function (error, results, fields) {
        var data = db.toJSON(results)[0];
        response.render(_VIEW + 'board/boardUpdate', {data : data});
      });
    };

    db.dbAction(action, connection);
  }

  function updateBoard() {
    var action = function() {
      var sql = "UPDATE board SET name = ?, subject = ?, content = ? WHERE idx = ? AND pw = ?";
      var formData = request.body;
      var params = [formData.name, formData.subject, formData.content, param.idx, formData.pw];

      connection.query(sql, params, function (error, results, fields) {
        var isUpdated = results.affectedRows;

        if(isUpdated)
          response.render(_VIEW + 'common/redirect', {msg : "완료되었습니다.", url : "/board/view/" + param.idx});
        else
          response.render(_VIEW + 'common/redirect', {msg : "비밀번호가 일치하지 않습니다.", url : "/board/update/" + param.idx});
      });
    };

    db.dbAction(action, connection);
  }

  function openBoardDelete() {
    response.render(_VIEW + 'board/boardDelete', {idx : param.idx});
  }

  function deleteBoard() {
    var action = function() {
      var sql = "DELETE FROM board WHERE idx = ? AND pw = ?";
      var formData = request.body;
      var params = [param.idx, formData.pw];

      connection.query(sql, params, function (error, results, fields) {
        var isDeleted = results.affectedRows;

        if(isDeleted)
          response.render(_VIEW + 'common/redirect', {msg : "완료되었습니다.", url : "/board"});
        else
          response.render(_VIEW + 'common/redirect', {msg : "비밀번호가 일치하지 않습니다.", url : "/board/delete/" + param.idx});
      });
    };

    db.dbAction(action, connection);
  }
}
