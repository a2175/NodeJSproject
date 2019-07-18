var DAO = require(_APP + 'board/dao/BoardDAO');

class BoardService {
  constructor(param) {
    this.boardDAO = new DAO(param);
    this.param = param;
  }

  openBoardList() {
    var list = this.boardDAO.openBoardList();
    var result = {
      list: list,
      listNum: list.length
    };

    return result;
  }

  openBoardDetail() {

  }

  insertBoard() {

  }

  updateBoard() {

  }

  deleteBoard() {

  }
}

module.exports = BoardService;
