
const ejs = require("ejs");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model")
const usercontroller = {
  register: async (req, res) => {
    const { email, name, password, city, age } = req.body;
    if (!email || !name || !password || !city || !age) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    try {
      const isExistUser = await UserModel.findOne({ email: email });
      if (isExistUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await UserModel.create({
        ...req.body,
        password: hashedPassword,
      });
      return res.status(201).json({
        message: "User registered successfully",
        user: newUser,
      });
      console.log(newUser);

    } catch (error) {
      return res.status(500).json({ message: error.message });
    }




  },
  login: async (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const isExistUser = await UserModel.findOne({ email: req.body.email });

    if (!isExistUser) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(
      req.body.password,
      isExistUser.password
    );

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ message: "User logged in successfully" })
  }
   
}


  // 



  ;

module.exports = usercontroller;


