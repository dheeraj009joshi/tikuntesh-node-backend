const express = require('express');
const {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
} = require('../../controllers/blogController');
const { protect } = require('../../middlewares/authMiddleware');
const multer = require('multer');
const upload = multer(); 
const router = express.Router();

router.route('/')
  .get( protect, getBlogs)
  .post( upload.any(),createBlog);

router.route('/:id')
  .get( getBlog)
  .put(upload.any(), updateBlog)
  .delete( deleteBlog);


module.exports = router;
