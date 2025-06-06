const express = require("express");
const usercontroller = require("../controllers/user.controller");



const userRouter = express.Router();

userRouter.post("/register", usercontroller.register);
// userRouter.post("/logout", usercontroller.logout);
userRouter.post("/login", usercontroller.login);


module.exports = userRouter;