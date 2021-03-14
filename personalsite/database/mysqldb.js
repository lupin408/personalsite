const mysql = require('mysql');




const connection = mysql.createConnection({
  host: 'localhost',
  user: 'student',
  password: 'student'
});
connection.query('use blog', (e, r) => {
  if (e) {
    console.log(e)
  }
})

module.exports = connection;
