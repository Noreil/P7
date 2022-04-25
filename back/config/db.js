const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  hoste: 'localhost',
  database: 'groupomania',
  user: 'root',
  password: '',
});

mysqlConnection.connect((err) => {
  if (err) console.log(`error connecting: ${err}`);
  else {
    console.log('Connect to database : groupomania');
    console.log(`Connect as id ${mysqlConnection.threadId}`);
  }
});

module.exports = mysqlConnection;
