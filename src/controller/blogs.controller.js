const Blogs = require("../models/blogs.model");
const { blogsNotFound } = require("../constants/error.message");

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find();
    if (blogs) {
      return res.status(200).send(blogs);
    }
    return res.status(404).json({
      message: blogsNotFound,
    });
  } catch (error) {
    return res.status(400).json({
      error: error,
    });
  }
};

exports.postBlog = async (req, res) => {
  const { author, title, url } = req.body;
  try {
    const blog = await new Blogs({ author, title, url });
    blog.save();
    return res.status(200).send(blog);
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.deleteBlog = async (req, res) => {
  const _id = req.params.id;
  try {
    await Blogs.deleteOne({ _id });
    return res.status(200).send(_id);
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.updateBlog = async (req, res) => {
  const _id = req.params.id;
  try {
    await Blogs.updateOne({ _id });
    return res.status(200).send(_id);
  } catch (error) {
    return res.status(400).send(error);
  }
};
