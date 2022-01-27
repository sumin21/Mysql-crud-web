const mysql = require('mysql');
const passw = require('./db-password');
console.log(passw)
const mql = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : passw,
  database : 'crud_db'
});

module.exports = mql;