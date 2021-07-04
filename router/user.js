const con = require("../setting/connection");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { User } = require("../service/User");
const user = new User();

const { loginValidation } = require("../validation/authenValidaton");

router.post("/register", async (req, res) => {
  let { email, password, firstname, lastname, tel, address } = req.body;
  let userData = req.body;
  const register = await user.registerData(userData);
  if (register) {
    res.send({ status: true });
  } else {
    res.send({ status: false });
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let { email, password } = req.body;
  let userData = req.body;
  try {
    const login = await user.loginData(userData);
    if (login) {
      res.header("auth-token", login).send(login);
    }
  } catch (error) {
    res.send({ status: false });
  }
});

router.get("/getID", async(req,res)=>{
    let token = req.headers.authorization;
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, "BOOK");
    const user_id = decoded.user_id;
    if (user_id){
        res.send({user_id : user_id})
    }
})

module.exports = router;
