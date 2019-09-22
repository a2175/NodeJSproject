module.exports = {
  dbSet : {
            host: 'localhost',
            user: 'root',
            password: '0000',
            database: 'mydb',
            multipleStatements: true
         },

  toJSON : function(rows) {
     return JSON.parse(JSON.stringify(rows));
  }
}
