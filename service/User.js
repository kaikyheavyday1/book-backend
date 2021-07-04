const con = require("../setting/connection");
const jwt = require("jsonwebtoken");
class User {
  registerData(userData) {
    return new Promise((resolve, reject) => {
      let { email, password, firstname, lastname, tel, address } = userData;
      const sql = `insert into user (email, password, firstname, lastname, tel, address)
        values (?,?,?,?,?,?)`;
      const Data = [email, password, firstname, lastname, tel, address];
      const values = Object.values(Data);
      try {
        con.query(sql, values, (err, result) => {
          if (err) throw err;
          resolve(result);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  loginData(userData) {
    return new Promise((resolve, reject) => {
      let { email, password } = userData;
      const sql = `SELECT id, email, password from user where email = ?`;
      const Data = [email];
      const values = Object.values(Data);
      try {
        con.query(sql, values, (err, result) => {
          if (err) throw err;
          if (result.length === 0) reject("error");
          if (password !== result[0].password) {
            reject("error");
          } else {
            const token = jwt.sign({ user_id: result[0].id }, "BOOK");
            resolve(token);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports.User = User;
