const con = require("../setting/connection");
class Rating {
  addRating(data) {
    return new Promise((resolve, reject) => {
      let { user_id, rating, product_id } = data;
      const sql =
        "insert into rating (product_id, user_id, rating) values (?,?,?)";
      const Data = [product_id, user_id, rating];
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
  checkrepeatRating(data) {
    return new Promise((resolve, reject) => {
      let { user_id, rating, product_id } = data;
      const sql = "select * from rating where product_id = ? and user_id =?";
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
  avgRating(data){
      return new Promise((resolve,reject)=>{
        const sql ="select avg(rating) as avgrating from rating where product_id"
        const Data = [data]
        const values = Object.values(Data)
        try {
        con.query(sql, values, (err, result)=>{
            if (err) throw err
            resolve(result)
        })
        } catch (error) {
            reject(error)
        }
      })
  }
}
module.exports.Rating = Rating;
