var express = require('express');
var router = express.Router();
var url = require('url');
var querystring = require('querystring');

var boardService = require(_SERVICE + "boardService");

// 게시글 페이지 불러오기
router.get('/posts', async function(request, response) {
  request.querystring = querystring.parse(url.parse(request.url).query);
  var data = await boardService.selectBoardList(request);
  response.render(_VIEW + 'board/boardList', {data : data, request_querystring : request.querystring});
});

// 게시글 불러오기
router.get('/posts/:idx(\\d+)', async function(request, response, next) {
  var data = await boardService.selectBoardDetail(request);
  response.render(_VIEW + 'board/boardDetail', {data : data, idx : request.params.idx});
});

// 게시글 등록
router.post('/posts', async function(request, response) {
  await boardService.insertBoard(request);
  response.redirect("/board/posts");
});

// 게시글 수정
router.put('/posts/:idx', async function(request, response) {
  var isUpdated = await boardService.updateBoard(request);
  response.send(isUpdated);
});

// 게시글 삭제
router.delete('/posts/:idx', async function(request, response) {
  var isDeleted = await boardService.deleteBoard(request);
  response.send(isDeleted);
});

// 게시글 작성 페이지 불러오기
router.get('/posts/write', function(request, response) {
  response.render(_VIEW + 'board/boardWrite');
});

// 게시글 수정 페이지 불러오기
router.get('/posts/:idx/edit', async function(request, response) {
  var data = await boardService.selectBoardDetail(request);
  response.render(_VIEW + 'board/boardUpdate', {data : data, idx : request.params.idx});
});

// 게시글 삭제 페이지 불러오기
router.get('/posts/:idx/delete', function(request, response) {
  response.render(_VIEW + 'board/boardDelete', {idx : request.params.idx});
});

module.exports = router;
