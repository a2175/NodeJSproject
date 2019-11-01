var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var mydb = require(_CONFIG + "database");

var connection = mysql.createConnection(mydb.dbSet);

// 게시글 페이지 불러오기
router.get('/page/:page_num', function(request, response) {
  var nPageIndex = request.params.page_num - 1;
  var nPageRow = 15;

  var START = nPageIndex * nPageRow;
  var END = nPageRow;

  var sql1 = "SELECT *, (SELECT count(IDX) FROM comment WHERE board_idx = board.idx) AS commentNum FROM board ORDER BY idx DESC LIMIT ?, ?;";
  var sql2 = "SELECT count(*) AS count FROM board";
  var params = [START, END];

  connection.query(sql1 + sql2, params, function (error, results, fields) {
    var data = {
      list: mydb.toJSON(results[0]),
      listNum: results[1][0].count
    };
    response.render(_VIEW + 'board/boardList', {data : data, page_num : request.params.page_num});
  });
});

// 검색 결과 게시글 페이지 불러오기
router.get('/page/:page_num/:keyword', function(request, response) {
  var nPageIndex = request.params.page_num - 1;
  var nPageRow = 15;

  var START = nPageIndex * nPageRow;
  var END = nPageRow;

  var sql1 = "SELECT *, (SELECT count(IDX) FROM comment WHERE board_idx = board.idx) AS commentNum FROM board WHERE subject LIKE CONCAT('%', ?, '%') ORDER BY idx DESC LIMIT ?, ?;";
  var sql2 = "SELECT count(*) AS count FROM board WHERE subject LIKE CONCAT('%', ?, '%')";
  var params = [request.params.keyword, START, END, request.params.keyword];

  connection.query(sql1 + sql2, params, function (error, results, fields) {
    var data = {
      list: mydb.toJSON(results[0]),
      listNum: results[1][0].count
    };
    response.render(_VIEW + 'board/boardList', {data : data, page_num : request.params.page_num, keyword : request.params.keyword});
  });
});

// 게시글 불러오기
router.get('/post/:idx', function(request, response) {
  var sql = "SELECT * FROM board WHERE idx = ?";
  var params = [request.params.idx];

  connection.query(sql, params, function (error, results, fields) {
    var data = mydb.toJSON(results)[0];
    response.render(_VIEW + 'board/boardDetail', {data : data, idx : request.params.idx});
  });
});

// 게시글 등록
router.post('/post', function(request, response) {
  var sql = 'INSERT INTO board SET name = ?, pw = ?, subject = ?, content = ?, date=now()';
  var formData = request.body;
  var params = [formData.name, formData.pw, formData.subject, formData.content];

  connection.query(sql, params, function (error, results, fields) {
    response.render(_VIEW + 'common/redirect', {msg : "완료되었습니다.", url : "/board/page/1"});
  });
});

// 게시글 수정
router.put('/post/:idx', function(request, response) {
  var sql = "UPDATE board SET name = ?, subject = ?, content = ? WHERE idx = ? AND pw = ?";
  var formData = request.body;
  var params = [formData.name, formData.subject, formData.content, request.params.idx, formData.pw];

  connection.query(sql, params, function (error, results, fields) {
    var isUpdated = String(results.affectedRows);
    response.send(isUpdated);
  });
});

// 게시글 삭제
router.delete('/post/:idx', function(request, response) {
  var sql = "DELETE FROM board WHERE idx = ? AND pw = ?";
  var formData = request.body;
  var params = [request.params.idx, formData.pw];

  connection.query(sql, params, function (error, results, fields) {
    var isDeleted = results.affectedRows;

    if(isDeleted)
      response.render(_VIEW + 'common/redirect', {msg : "완료되었습니다.", url : "/board/page/1"});
    else
      response.render(_VIEW + 'common/redirect', {msg : "비밀번호가 일치하지 않습니다.", url : "/board/delete/" + request.params.idx});
  });
});

// 게시글 작성 페이지 불러오기
router.get('/write', function(request, response) {
  response.render(_VIEW + 'board/boardWrite');
});

// 게시글 수정 페이지 불러오기
router.get('/edit/:idx', function(request, response) {
  var sql = "SELECT * FROM board WHERE idx = ?";
  var params = [request.params.idx];

  connection.query(sql, params, function (error, results, fields) {
    var data = mydb.toJSON(results)[0];
    response.render(_VIEW + 'board/boardUpdate', {data : data, idx : request.params.idx});
  });
});

// 게시글 삭제 페이지 불러오기
router.get('/delete/:idx', function(request, response) {
  response.render(_VIEW + 'board/boardDelete', {idx : request.params.idx});
});

module.exports = router;
