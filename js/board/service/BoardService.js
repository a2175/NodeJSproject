var DAO = require(_APP + 'board/dao/BoardDAO');

class BoardService {
  constructor(request, param) {
    this.boardDAO = new DAO(request, param);
    this.param = param;
    this.request = request;
  }

  openBoardList() {
    var list = this.boardDAO.openBoardList();
    var listNum = this.boardDAO.countBoard();
    var result = {
      list: list,
      listNum: listNum[0].count
    };

    return result;
  }

  openBoardDetail() {
    return this.boardDAO.openBoardDetail()[0];
  }

  insertBoard() {
    this.boardDAO.insertBoard();
  }

  updateBoard() {

  }

  deleteBoard() {

  }
}

module.exports = BoardService;
