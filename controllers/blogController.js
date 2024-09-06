const Blog = require("../models/blog");
const { uploadImageAndGetUrl } = require('../config/azure-blob');

// Create a new Blog
exports.createBlog = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    // Check if any files are uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "Thumbnail and images are required" });
    }

    // Initialize variables to store the thumbnail and images
    let thumbnailFile = null;
    let imageFiles = [];

    // Loop through req.files to find the thumbnail and images
    req.files.forEach(file => {
      if (file.fieldname === 'thumbnail') {
        thumbnailFile = file;
      } else if (file.fieldname === 'images') {
        imageFiles.push(file);
      }
    });

    // Check if a thumbnail was uploaded
    if (!thumbnailFile) {
      return res.status(400).json({ success: false, message: "Thumbnail is required" });
    }

    // Upload thumbnail
    const thumbnailUrl = await uploadImageAndGetUrl(thumbnailFile.buffer, thumbnailFile.originalname);

    // Upload images if available
    const imageUrls = [];
    for (let imageFile of imageFiles) {
      const imageUrl = await uploadImageAndGetUrl(imageFile.buffer, imageFile.originalname);
      imageUrls.push(imageUrl.split("?")[0]);
    }

    // Create a new blog with the uploaded image URLs
    const newBlog = await Blog.create({
      title,
      description,
      thumbnail: thumbnailUrl.split("?")[0], // Store thumbnail URL
      images: imageUrls, // Store uploaded image URLs
    });

    res.status(201).json({ success: true, data: newBlog });
  } catch (error) {
    console.error('Error in createBlog:', error);
    next(error); // Pass error to the error handler middleware
  }
};

// Get a single Blog by ID
exports.getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    console.error('Error in getBlog:', error);
    next(error);
  }
};
// Get all  Blog 
exports.getBlogs = async (req, res, next) => {
  try {
    const blog = await Blog.find();
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    console.error('Error in getBlog:', error);
    next(error);
  }
};

// Update a Blog by ID
exports.updateBlog = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    let thumbnailUrl = blog.thumbnail;
    let imageUrls = blog.images;

    if (req.files) {
      const thumbnailFile = req.files.find(file => file.fieldname === 'thumbnail');
      if (thumbnailFile) {
        thumbnailUrl = await uploadImageAndGetUrl(thumbnailFile.buffer, thumbnailFile.originalname);
      }

      const imageFiles = req.files.filter(file => file.fieldname === 'images');
      if (imageFiles.length > 0) {
        imageUrls = [];
        for (let imageFile of imageFiles) {
          const imageUrl = await uploadImageAndGetUrl(imageFile.buffer, imageFile.originalname);
          imageUrls.push(imageUrl.split("?")[0]);
        }
      }
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, {
      title,
      description,
      thumbnail: thumbnailUrl.split("?")[0],
      images: imageUrls,
    }, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: updatedBlog });
  } catch (error) {
    console.error('Error in updateBlog:', error);
    next(error);
  }
};

// Delete a Blog by ID
exports.deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error('Error in deleteBlog:', error);
    next(error);
  }
};
