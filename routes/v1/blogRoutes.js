const express = require('express');
const {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
} = require('../../controllers/blogController');
const { protect } = require('../../middlewares/authMiddleware');

const router = express.Router();

router.route('/')
  .get( getBlogs)
  .post( createBlog);

router.route('/:id')
  .get( getBlog)
  .put( updateBlog)
  .delete( deleteBlog);


module.exports = router;
