const mysql = require("mysql");
const con = mysql.createConnection({
  host: "books-project.crjp8zi4ulpc.ap-southeast-1.rds.amazonaws.com",
  user: "kaiky",
  password: "12345678",
  database: "book",
});

module.exports = con;
