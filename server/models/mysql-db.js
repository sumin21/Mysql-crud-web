const mysql = require('mysql');

const mql = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '200724s',
  database : 'crud_db'
});

// mql.connect(function(err) {
//   if (err) throw err;
//   console.log('mysql connected');
//   const sql = ""
//   mql.query(sql, function(err, result){
//     if(err) throw err;
//     console.log('table created');
//   })
// })
module.exports = mql;