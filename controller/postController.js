const Post = require("../models/post");
const User = require("../models/user");

exports.getPosts = (req, res, next) => {
  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => {
      res.render("post", { posts: posts });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error");
    });
};

exports.getPostsByCategory = (req, res, next) => {
  const category = req.params.category;
  const searchQuery = req.query.search || ""; 
  const regex = new RegExp(searchQuery, "i");

  Post.find({
    category: category,
    $or: [{ title: regex }, { description: regex }], 
  })
    .sort({ createdAt: -1 })
    .then((posts) => {
      res.render("category-posts", {
        posts: posts,
        category: category,
        searchQuery: searchQuery,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error");
    });
};

exports.detailsPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then((post) => {
      res.render("post-details", { post: post });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error");
    });
};

exports.sendMessage = (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send("Name, email, and message are required.");
  }

  const user = new User({
    name: name,
    email: email,
    message: message,
  });

  user
    .save()
    .then((result) => {
      res.redirect("/index");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Failed to send message. Please try again.");
    });
};
