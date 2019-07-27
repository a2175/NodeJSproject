var db = require(_CONFIG + "database");

module.exports = function ChatController(request, response, param) {
  var connection = db.getDB();

  if(isset(request.body.request)) {
    switch(request.body.request) {
      case 'insert' : insertChat(); break;
    }
  }
  else {
    switch(param.action){
      case 'view' : selectChatList(); break;
      case null : openChat(); break;
    }
  }

  function openChat() {
    response.render(_VIEW + 'chat/chat');
  }

  function selectChatList() {
    var action = function() {
      var sql = "SELECT * FROM chat";

      connection.query(sql, function (error, results, fields) {
        var data = db.toJSON(results);
        response.send(data);
      });
    };

    db.dbAction(action, connection);
  }

  function insertChat() {
    var action = function() {
      var sql = "INSERT INTO chat SET name = ?, content = ?, date=now()";
      var formData = request.body;
      var params = [formData.name, formData.content];

      connection.query(sql, params, function (error, results, fields) {
          response.end();
      });
    };

    db.dbAction(action, connection);
  }
}
