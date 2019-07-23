var Service = require(_APP + 'chat/service/ChatService');

class ChatController {
  constructor(request, response, param) {
    this.chatService = new Service(request, param);
    this.param = param;
    this.request = request;
    this.response = response;
  }

  respondView() {
    if(isset(this.request.body.request)) {
      switch(this.request.body.request) {
        case 'insert' : this.insertChat(); break;
      }
    }
    else {
      switch(this.param.action){
        case 'view' : this.selectChatList(); break;
        case null : this.openChat(); break;
      }
    }
  }

  openChat() {
    this.response.render(_VIEW + 'chat/chat');
  }

  selectChatList() {
    var data = this.chatService.selectChatList();
    this.response.send(data);
  }

  insertChat() {
    this.chatService.insertChat();
    this.response.end();
  }
}

module.exports = ChatController;
