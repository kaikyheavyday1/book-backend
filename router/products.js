const con = require("../setting/connection");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { Product } = require("../service/Product");
const product = new Product();

router.post("/post", async (req, res) => {
  let token = req.headers.authorization;
  token = token.split(" ")[1];
  const decoded = jwt.verify(token, "BOOK");
  const user_id = decoded.user_id;
  let body = req.body;
  body["user_id"] = user_id;
  const uploadBook = await product.insertBook(body);
  if (uploadBook) {
    res.send({ status: true });
  } else {
    res.send({ status: false });
  }
});
router.get("/getall", async (req, res) => {
  const getProduct = await product.getallProduct();
  if (getProduct) {
    res.send(getProduct);
  }
});
router.get("/getbyuserID", async (req, res) => {
  let token = req.headers.authorization;
  token = token.split(" ")[1];
  const decoded = jwt.verify(token, "BOOK");
  const user_id = decoded.user_id;
  const getProduct = await product.getProductbyUserID(user_id);
  if (getProduct) {
    res.send(getProduct);
  }
});
router.get("/getproductID", async (req, res) => {
  const query = req.query;
  const getproduct = await product.getProductbyID(query.id);
  if (getproduct) {
    res.send(getproduct);
  }
});
router.get("/list", async (req, res) => {
  const query = req.query;
  if (query.list === "top") {
    const getProduct = await product.getProductTop();
    if (getProduct) {
      res.send(getProduct);
    }
  } else if (query.list === "discount") {
    const getProduct = await product.getProductdiscount();
    res.send(getProduct);
  }
});
router.post("/update", async (req, res) => {
  const query = req.query;
  if (query.status === "off") {
    const updatestatus = await product.updateStatusOff(query.id);
    if (updatestatus) {
      res.send({ status: true });
    }
  } else if (query.status === "on") {
    const updatestatus = await product.updateStatusOn(query.id);
    if (updatestatus) {
      res.send({ status: true });
    }
  }
});
router.post("/edit", async (req, res) => {
  let body = req.body;
  const editproduct = await product.updateProductbyID(body);
  if (editproduct) {
    res.send({ status: true });
  }
});
router.get("/delete", async (req, res) => {
  const query = req.query;
  const deletebook = await product.deleteProduct(query.id);
  if (deletebook) {
    res.send({ status: true });
  }
});
module.exports = router;
