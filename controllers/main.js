//require('dotenv').config();
const jwt = require("jsonwebtoken");
const {badRequest} = require("../errors");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new badRequest("please enter email and password");
  }

  //that provided from DB
  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {expiresIn: '30d', }); //to create token
  //console.log(username,password);
  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {

  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `hello, ${req.user.username}`,
    secret: `here is your authorized data , your lucky number is ${luckyNumber}`,
  });

};

module.exports = { login, dashboard };
