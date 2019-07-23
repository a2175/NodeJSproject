class ChatDAO {
  constructor(request, param) {
    this.param = param;
    this.request = request;
    this.db = require(_CONFIG + "/database");
  }

  selectChatList() {
    var sql = "SELECT * FROM chat";
    return this.db.query(sql);
  }

  insertChat() {
    var sql = "INSERT INTO chat SET name = ?, content = ?, date=now()";
    var formData = this.request.body;
    var params = [formData.name, formData.content];
    this.db.query(sql, params);
  }
}

module.exports = ChatDAO;
