const router = require("express").Router();
const {
  getBlogs,
  postBlog,
  deleteBlog,
  updateBlog,
} = require("../controller/blogs.controller");

router.get("/blogs", getBlogs);
router.post("/blogs", postBlog);
router.delete("/blogs/:id", deleteBlog);
router.put("/blogs/:id", updateBlog);

module.exports = router;
