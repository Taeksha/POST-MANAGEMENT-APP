const express = require("express");
const postController = require("../controllers/post.controller");




const postRouter = express.Router();

postRouter.post("/add", postController.addPost);
postRouter.get("/get", postController.getPosts);
postRouter.patch("/update/:postId", postController.updatePost);
postRouter.delete("/delete/:postId", postController.updatePost);


module.exports = postRouter