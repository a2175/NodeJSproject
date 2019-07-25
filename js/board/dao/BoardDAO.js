class BoardDAO {
  constructor(request, param) {
    this.param = param;
    this.request = request;
    this.db = require(_CONFIG + "/database");
  }

  openBoardList() {
    var nPageIndex = this.param.page_num - 1;
    var nPageRow = 15;

    var START = nPageIndex * nPageRow;
    var END = nPageRow;

    var sql = "SELECT * FROM board ORDER BY idx DESC LIMIT ?, ?";
    var params = [START, END];
    return this.db.query(sql, params);
  }

  openBoardSearchList() {
    var nPageIndex = this.param.page_num - 1;
    var nPageRow = 15;

    var START = nPageIndex * nPageRow;
    var END = nPageRow;

    var sql = "SELECT * FROM board WHERE subject LIKE CONCAT('%', ?, '%') ORDER BY idx DESC LIMIT ?, ?";
    var params = [this.param.keyword ,START, END];
    return this.db.query(sql, params);
  }

  countBoard() {
    var sql = "SELECT count(*) AS count FROM board";
    return this.db.query(sql);
  }

  countSearchBoard() {
    var sql = "SELECT count(*) AS count FROM board WHERE subject LIKE CONCAT('%', ?, '%')";
    var params = [this.param.keyword];
    return this.db.query(sql, params);
  }

  openBoardDetail() {
    var sql = "SELECT * FROM board WHERE idx = ?";
    var params = [this.param.idx];
    return this.db.query(sql, params);
  }

  insertBoard() {
    var sql = 'INSERT INTO board SET name = ?, pw = ?, subject = ?, content = ?, date=now()';
    var formData = this.request.body;
    var params = [formData.name, formData.pw, formData.subject, formData.content];
    this.db.query(sql, params);
  }

  updateBoard() {
    var sql = "UPDATE board SET name = ?, subject = ?, content = ? WHERE idx = ? AND pw = ?";
    var formData = this.request.body;
    var params = [formData.name, formData.subject, formData.content, this.param.idx, formData.pw];
    return this.db.query(sql, params);
  }

  deleteBoard() {
    var sql = "DELETE FROM board WHERE idx = ? AND pw = ?";
    var formData = this.request.body;
    var params = [this.param.idx, formData.pw];
    return this.db.query(sql, params);
  }
}

module.exports = BoardDAO;
