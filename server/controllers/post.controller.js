const PostModel = require("../models/post.model");


const postController = {
    // create post
    addPost: async (req, res) => {
        if (!req.body.title || !req.body.content) {
            return res
                .status(400)
                .json({ message: "Title and content are required" });
        }

        try {

            const post = await PostModel.create({ ...req.body });
            res.status(201).json({
                message: "Post created successfully",
                post,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getPosts: async (req, res) => {
        try {
            const posts = await PostModel.find();
            if (posts.length === 0) {
                return res.status(404).json({ message: "No posts found" });
            }
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    deletePost: async (req, res) => {
        const { postId} = req.params;

        try {
            const post = await PostModel.findByIdAndDelete(postId);

            if (!post) {
                return res.status(404).json({ message: "Post not found" });
            }

            res.status(200).json({ message: "Post deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    updatePost: async (req, res) => {
        const { postId } = req.params;

        if (!postId) {
            return res.status(400).json({ message: "Post ID is required" });
        }

        if (!req.file) {
            const updateprofile = await PostModel.findByIdAndUpdate(postId, {
                $set: { ...req.body },
            });
            if (!updateprofile) {
                return res.status(400).json({ message: "Error while updating post" });
            }
            res.status(200).json({ message: "Data updated successfully" });
        }
        if (req.file) {
            const updateprofile = await PostModel.findByIdAndUpdate(postId, {
                $set: { ...req.body, postImage: req.file.originalname },
            });
            if (!updateprofile) {
                return res.status(400).json({ message: "Error while updating post" });
            }
            res.status(200).json({ message: "Data updated successfully" });
        }
    }



}

module.exports = postController;
