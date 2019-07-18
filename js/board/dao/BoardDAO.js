var mysql = require('sync-mysql');

class BoardDAO {
  constructor(param) {
    this.param = param;
    this.db = new mysql({
      host: 'localhost',
      port: '3307',
      user: 'root',
      password: '000000',
      database: 'mydb'
    });
  }

  openBoardList() {
    return this.db.query('SELECT * FROM board limit 10');
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

module.exports = BoardDAO;
