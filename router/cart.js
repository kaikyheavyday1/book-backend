const con = require("../setting/connection");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { Cart } = require("../service/Cart");
const cart = new Cart();

router.post("/add", async (req, res) => {
  let body = req.body;
  let token = req.headers.authorization;
  token = token.split(" ")[1];
  const decoded = jwt.verify(token, "BOOK");
  const user_id = decoded.user_id;
  body["user_id"] = user_id;
  const addproduct = await cart.addCart(body);
  if (addproduct) {
    res.send({ status: true });
  } else {
    res.send({ status: false });
  }
});
router.get("/get", async (req, res) => {
  let token = req.headers.authorization;
  token = token.split(" ")[1];
  const decoded = jwt.verify(token, "BOOK");
  const user_id = decoded.user_id;
  const getcart = await cart.getCartbyuserID(user_id);
  if (getcart) {
    res.send(getcart);
  }
});
router.get("/getorder", async (req, res) => {
  let token = req.headers.authorization;
  token = token.split(" ")[1];
  const decoded = jwt.verify(token, "BOOK");
  const user_id = decoded.user_id;
  const getcart = await cart.getCartorder(user_id);
  if (getcart) {
    res.send(getcart);
  }
});
router.get("/delete", async (req, res) => {
  const query = req.query;
  if (query.all) {
    let token = req.headers.authorization;
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, "BOOK");
    const user_id = decoded.user_id;
    console.log(user_id);
    const deleteall = await cart.deleteAllcart(user_id);
    if (deleteall) {
      res.send({ status: true });
    }
  } else if (query.id) {
    const remove = await cart.deleteCart(query.id);
    if (remove) {
      res.send({ status: true });
    }
  }
});

module.exports = router;
