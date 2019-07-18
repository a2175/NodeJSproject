var Service = require(_APP + 'board/service/BoardService');

class BoardController {
  constructor(request, response, param) {
    this.boardService = new Service(param);
    this.param = param;
    this.request = request;
    this.response = response;
  }

  respondView() {
    switch (this.param['action']) {
      // case 'view' : this->openBoardDetail(); break;
      // case 'write' : this->openBoardWrite(); break;
      // case 'update' : this->openBoardUpdate(); break;
      // case 'delete' : this->openBoardDelete(); break;
      // case 'searchpage' : this->openBoardSearchList(); break;
      default : this.openBoardList(); break;
    }

  }
  // if(isset(_POST['request'])) {
  //     switch(_POST['request']) {
  //         case 'insert' : this->insertBoard(); break;
  //         case 'update' : this->updateBoard(); break;
  //         case 'delete' : this->deleteBoard(); break;
  //     }
  // }

  openBoardList() {
    var data = this.boardService.openBoardList();

    this.response.render(_VIEW + 'temp', {data : data});
  }
}

module.exports = BoardController;
