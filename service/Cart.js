const con = require("../setting/connection");
class Cart {
  addCart(data) {
    return new Promise((resolve, reject) => {
      let { user_id, productID } = data;
      const sql = "insert into cart (user_id, product_id) values (?,?)";
      const Data = [user_id, productID];
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
  getCartbyuserID(user_id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT c.id, p.name,p.price-p.discount as price,p.user_id ,p.pic FROM cart as c inner join products as p 
          on c.product_id = p.id where c.user_id = ?`;
      const Data = [user_id];
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
  getCartorder(user_id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT c.user_id, c.product_id ,p.price-p.discount as price from cart c
      inner join products p on c.product_id = p.id where c.user_id = ?`;
      const Data = [user_id];
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
  deleteCart(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM cart WHERE id = ?";
      const Data = [id];
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
  deleteAllcart(user_id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM cart WHERE user_id = ?";
      const Data = [user_id];
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
}

module.exports.Cart = Cart;
