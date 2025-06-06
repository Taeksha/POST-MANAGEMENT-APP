const express = require("express");
const connection = require("./config/db")
const userRouter = require("./routes/user.routes")
require("dotenv").config();
var cookieParser = require("cookie-parser");
const postRouter = require("./routes/post.routes")

const app = express();


app.use(express.json());
app.use(cookieParser());



app.use("/api/user", userRouter);
app.use("/api/post", postRouter);


app.listen(process.env.PORT || 3000, async () => {
  try {
    await connection;
    console.log("server is running");
    console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
  } catch (error) {
    console.log(error);
  }
});
