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

  openBoardSearchList() {
    var list = this.boardDAO.openBoardSearchList();
    var listNum = this.boardDAO.countSearchBoard();
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
    return this.boardDAO.updateBoard().affectedRows;
  }

  deleteBoard() {
    return this.boardDAO.deleteBoard().affectedRows;
  }
}

module.exports = BoardService;
