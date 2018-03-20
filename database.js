const mysql = require('mysql');
const {DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE} = require('./config');

let db;

function connectDatabase(){
  if(!db){
    db = mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE
    });
    db.connect((err) => {
      if(!err){
        console.log('Database connected')
      }else{
        console.log('error connecting database')
      }
    });
  }
  return db
}

module.exports = connectDatabase();