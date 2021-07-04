const con = require("../setting/connection");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { Payment } = require("../service/Payment");
const { Ordering } = require("../service/Ordering");
const { Cart } = require("../service/Cart");
const payment = new Payment();
const ordering = new Ordering();
const cart = new Cart();
router.post("/", async (req, res) => {
  let body = req.body;
  let token = req.headers.authorization;
  token = token.split(" ")[1];
  const decoded = jwt.verify(token, "BOOK");
  const user_id = decoded.user_id;
  const addPayment = await payment.insertPayment(body.payment);
  if (addPayment) {
    const getPaymentID = await payment.getPayment(body.payment);
    if (getPaymentID) {
      const addorder = await ordering.insertOrder(
        getPaymentID[0].id,
        body.cart
      );
      if (addorder) {
        const deletecart = await cart.deleteAllcart(user_id);
        if (deletecart) {
          res.send({ status: true });
        } else {
          res.send({ status: false });
        }
      } else {
        res.send({ status: false });
      }
    } else {
      res.send({ status: false });
    }
  }
});

module.exports = router;
