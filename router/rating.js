const con = require("../setting/connection");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { Rating } = require("../service/Rating");
const { Product } = require("../service/Product");
const rating = new Rating();
const product = new Product();

router.post("/", async (req, res) => {
  let query = req.query.product_id;
  let body = req.body;
  let token = req.headers.authorization;
  token = token.split(" ")[1];
  const decoded = jwt.verify(token, "BOOK");
  const user_id = decoded.user_id;
  body["user_id"] = user_id;
  body["product_id"] = query;
  const checkuser = await product.checkuserID(body);
  if (checkuser.status === false) {
    const checkrepeat = await rating.checkrepeatRating(body);
    if (checkrepeat.status === false) {
      const insertrating = await rating.addRating(body);
      if (insertrating) {
        const getAvgrating = await rating.avgRating(body.product_id);
        if (getAvgrating) {
          const updateRating = await product.updatingRating(
            getAvgrating[0].avgrating,
            body.product_id
          );
        }
        res.send("ให้ผลงานสำเร็จ");
      }
    } else {
      res.send("คุณได้ให้ผลงานนี้ไปแล้ว");
    }
  } else {
    res.send("คุณไม่สามารถให้ดาวผลงานตัวเองได้");
  }
});

module.exports = router;
