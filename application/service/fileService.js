var fileDAO = require(_DAO + "fileDAO");

class FileService {
  
    async selectFile(request) {
        var result = await fileDAO.selectFileByIdx(request);
        var data = rowsToJson(result)[0];

        return data;
    }

    async insertFile(request) {
        await fileDAO.insertFile(request);
    }
    
    async deleteFile(request) {
        await fileDAO.deleteFile(request);
    }

}

module.exports = new FileService();
