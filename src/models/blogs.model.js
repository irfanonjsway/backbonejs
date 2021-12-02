const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  author: String,
  title: String,
  url: String,
});

module.exports = mongoose.model("Blogs", BlogSchema);
