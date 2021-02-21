var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');

var fileService = require(_SERVICE + "fileService");
var upload = multer({ 
    dest: _ROOT + 'uploadedFiles/',
    limits: { fileSize: 1024 * 1024 }
}).single('file'); 

// 파일 다운로드
router.get('/:idx', async function(request, response) {
  var data = await fileService.selectFile(request)

  var filePath = _ROOT + "uploadedFiles/" + data.stored_file_name;
  var fileName = data.original_file_name;

  response.setHeader("Content-Disposition", "attachment;filename=" + encodeURI(fileName));
  response.setHeader("Content-Type","binary/octet-stream");

  var fileStream = fs.createReadStream(filePath);
  fileStream.pipe(response);
});

// 파일 등록
router.post('/:post_idx', async function(request, response) {
  upload(request, response, async function (err) {
    if (err) {
      return response.end(String(err));
    }
    await fileService.insertFile(request);
    response.redirect(`${_ROUTE_POST}/${request.params.post_idx}`);
  });
});

// 파일 삭제
router.delete('/:idx', async function(request, response) {
    await fileService.deleteFile(request);
    response.send(200);
});

module.exports = router;
