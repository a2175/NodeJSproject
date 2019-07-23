var DAO = require(_APP + 'chat/dao/ChatDAO');

class ChatService {
  constructor(request, param) {
    this.chatDAO = new DAO(request, param);
    this.param = param;
    this.request = request;
  }

  selectChatList() {
    return this.chatDAO.selectChatList();
  }

  insertChat() {
    this.chatDAO.insertChat();
  }
}

module.exports = ChatService;
