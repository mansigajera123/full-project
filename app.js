const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

const postRouter = require("./routes/post");
const bodyParser = require("body-parser");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "views");
app.use(postRouter);

app.use("/", (req, res, next) => {
  res.render("index");
  next();
});

mongoose
  .connect(
    "mongodb+srv://mansigajera2512:h8KYuSDiqjeF4YTE@cluster0.gwch9.mongodb.net/posts?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => app.listen(8000))
  .catch((err) => console.log(err));
