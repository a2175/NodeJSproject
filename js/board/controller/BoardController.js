var Service = require(_APP + 'board/service/BoardService');

class BoardController {
  constructor(request, response, param) {
    this.boardService = new Service(request, param);
    this.param = param;
    this.request = request;
    this.response = response;
  }

  respondView() {
    if(isset(this.request.body.request)) {
      switch(this.request.body.request) {
          case 'insert' : this.insertBoard(); break;
          case 'update' : this.updateBoard(); break;
          case 'delete' : this.deleteBoard(); break;
      }
    }
    else {
      switch (this.param.action) {
        case 'view' : this.openBoardDetail(); break;
        case 'write' : this.openBoardWrite(); break;
        case 'update' : this.openBoardUpdate(); break;
        case 'delete' : this.openBoardDelete(); break;
        case 'searchpage' : this.openBoardSearchList(); break;
        default : this.openBoardList(); break;
      }
    }
  }

  openBoardList() {
    var data = this.boardService.openBoardList();

    this.response.render(_VIEW + 'board/boardList', {data : data, param : this.param});
  }

  openBoardSearchList() {
    var data = this.boardService.openBoardSearchList();

    this.response.render(_VIEW + 'board/boardList', {data : data, param : this.param});
  }

  openBoardDetail() {
    var data = this.boardService.openBoardDetail();

    this.response.render(_VIEW + 'board/boardDetail', {data : data});
  }

  openBoardWrite() {
    this.response.render(_VIEW + 'board/boardWrite');
  }

  insertBoard() {
    this.boardService.insertBoard();

    this.response.render(_VIEW + 'common/redirect', {msg : "완료되었습니다.", url : "/board"});
  }

  openBoardUpdate() {
    var data = this.boardService.openBoardDetail();

    this.response.render(_VIEW + 'board/boardUpdate', {data : data});
  }

  updateBoard() {
    var isUpdated = this.boardService.updateBoard();

    if(isUpdated)
      this.response.render(_VIEW + 'common/redirect', {msg : "완료되었습니다.", url : "/board/view/" + this.param.idx});
    else
      this.response.render(_VIEW + 'common/redirect', {msg : "비밀번호가 일치하지 않습니다.", url : "/board/update/" + this.param.idx});
  }

  openBoardDelete() {
    this.response.render(_VIEW + 'board/boardDelete', {idx : this.param.idx});
  }

  deleteBoard() {
    var isDeleted = this.boardService.deleteBoard();

    if(isDeleted)
      this.response.render(_VIEW + 'common/redirect', {msg : "완료되었습니다.", url : "/board"});
    else
      this.response.render(_VIEW + 'common/redirect', {msg : "비밀번호가 일치하지 않습니다.", url : "/board/delete/" + this.param.idx});
  }
}

module.exports = BoardController;
