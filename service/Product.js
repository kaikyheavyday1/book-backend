const con = require("../setting/connection");
class Product {
  insertBook(bookdata) {
    return new Promise((resolve, reject) => {
      let { name, description, price, user_id, pic } = bookdata;
      const sql = `insert into products (name, description, price, discount, user_id, status, rating, pic)
            values (?, ?, ?, 0, ?, 1, 0, ?)`;
      const Data = [name, description, price, user_id, pic];
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
  getallProduct() {
    return new Promise((resolve, reject) => {
      const sql = "select id, name,price-discount as price, rating, pic from products where status = 1";
      try {
        con.query(sql, (err, result) => {
          if (err) throw err;
          resolve(result);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  getProductbyUserID(user_id) {
    return new Promise((resolve, reject) => {
      const sql = `select * from products where user_id = ?`;
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
  getProductbyID(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT p.id, p.name as productName, p.description, price, 
      p.discount, p.rating, p.pic, p.status, p.rating, p.create_date,
      us.firstname, us.lastname
      FROM products as p inner join user as us on p.user_id = us.id where p.id = ?;`;
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
  getProductTop(){
    return new Promise((resolve,reject)=>{
      const sql = "select id, name,price-discount as price, rating, pic from products where rating > 2 and status = 1"
      try {
        con.query(sql,(err, result)=>{
          if (err) throw err
          resolve(result)
        })
      } catch (error) {
          reject(error)
      }
    })
  }
  getProductdiscount(){
    return new Promise((resolve,reject)=>{
      const sql = "select id, name, price-discount as price, rating, pic from products where discount != 0 and status = 1"
      try {
        con.query(sql,(err, result)=>{
          if (err) throw err
          resolve(result)
        })
      } catch (error) {
          reject(error)
      }
    })
  }
  updateProductbyID(data) {
    return new Promise((resolve, reject) => {
      let { id, name, description, price } = data;
      const sql = `UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?;`;
      const Data = [name, description, price, id];
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
  updateStatusOff(id) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE products SET status = 2 WHERE id = ?;`;
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
  updateStatusOn(id) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE products SET status = 1 WHERE id = ?;`;
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
  deleteProduct(id) {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM products WHERE id = ?;`;
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
  checkuserID(data) {
    return new Promise((resolve, reject) => {
      let { user_id, product_id } = data;
      const sql = "SELECT * FROM book.products where id =? and user_id= ?;";
      const Data = [product_id, user_id];
      const values = Object.values(Data);
      try {
        con.query(sql, values, (err, result) => {
          if (err) throw err;
          if (result.length > 0) {
            resolve({ status: true });
          } else {
            resolve({ status: false });
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  updatingRating(avgrating, product_id) {
    return new Promise((resolve, reject) => {
      const sql = "update products set rating = ? where id =?";
      const Data = [avgrating, product_id];
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
module.exports.Product = Product;
