var boardDAO = require(_DAO + "boardDAO");
var fileDAO = require(_DAO + "fileDAO");

class BoardService {
  
  async selectBoardList(request) {
    var result;
    if(request.querystring.keyword)
      result = await boardDAO.selectBoardSearchList(request);
    else
      result = await boardDAO.selectBoardList(request);
    
    var data = {
      list: rowsToJson(result[0]),
      listNum: result[1][0].count
    };

    return data;
  };

  async selectBoardDetail(request) {
    var post = await boardDAO.selectBoardDetail(request);
    var file = await fileDAO.selectFileByBoardIdx(request);
    
    var data = {
      post: rowsToJson(post)[0],
      file: rowsToJson(file)[0]
    };
    
    return data;
  }

  async insertBoard(request) {
    var insertId = await boardDAO.insertBoard(request);
    return String(insertId);
  }

  async updateBoard(request) {
    var result = await boardDAO.updateBoard(request);
    return String(result.affectedRows);
  }

  async deleteBoard(request) {
    var result = await boardDAO.deleteBoard(request);
    return String(result.affectedRows);
  }

}

module.exports = new BoardService();
