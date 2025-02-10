const express = require("express");
const postController = require("../controller/postController");

const router = express.Router();

router.get("/posts", postController.getPosts);

router.get("/posts/:postId", postController.detailsPost);

router.get("/category/:category", postController.getPostsByCategory);

router.post("/addMessage", postController.sendMessage);

module.exports = router;
