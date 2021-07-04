const con = require("../setting/connection");
class Payment {
  insertPayment(data) {
    return new Promise((resolve, reject) => {
      let {
        total_price,
        firstname,
        lastname,
        address,
        district,
        amphure,
        province,
        zip,
        tel,
        delivery,
        pay,
      } = data;
      const sql = `insert into payment (totalPrice, firstname, lastname, address, district, 
                amphure, province, zip, tel, delivery, pay) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const Data = [
        total_price,
        firstname,
        lastname,
        address,
        district,
        amphure,
        province,
        zip,
        tel,
        delivery,
        pay,
      ];
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
  getPayment(data) {
    return new Promise((resolve, reject) => {
      let {
        firstname,
        lastname,
        address,
        district,
        amphure,
        province,
        zip,
        tel,
      } = data;
      const sql = `select Max(id) as id from payment where 
        firstname = ? and lastname = ? and address = ? 
        and district = ? and amphure = ? and province = ? and zip =?
        and tel = ?`;
      const Data = [
        firstname,
        lastname,
        address,
        district,
        amphure,
        province,
        zip,
        tel,
      ];
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

module.exports.Payment = Payment;
