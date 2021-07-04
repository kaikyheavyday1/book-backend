const { json } = require("express");
const con = require("../setting/connection");
class Ordering {
  insertOrder(payment_id, cart) {
    return new Promise((resolve, reject) => {
      cart.forEach((cartarray) => {
        let { user_id, product_id, price } = cartarray;
        const sql =
          "insert into ordering(user_id,product_id,price,payment_id) values (?,?,?,?)";
        const Data = [user_id, product_id, price, payment_id];
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
    });
  }
 
}
module.exports.Ordering = Ordering;
