const http = require("http");
const express = require("express");
const app = express();
const con = require("./setting/connection");
const cors = require("cors");
const server = http.createServer(app);
const PORT = 4000;

const user = require("./router/user");
const products = require("./router/products");
const cart = require("./router/cart");
const rating = require("./router/rating");
const payment = require("./router/payment");

app.use(express.json());
app.use(cors());

app.use("/user", user);
app.use("/products", products);
app.use("/cart", cart);
app.use("/rating", rating);
app.use("/payment", payment);

app.get("/hello", (req, res) => {
  console.log("Hello");
  res.send("Hello");
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected successfully");
});

server.listen(PORT, () => {
  console.log(`server is running on port : ${PORT}`);
});
