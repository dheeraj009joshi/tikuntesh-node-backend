const Project = require("../models/project");
const User = require("../models/user");
const { uploadImageAndGetUrl } = require('../../config/azure-blob');

// Create a new Project
exports.createProject = async (req, res, next) => {
  try {
    const { title, description, category, yearOfProject, Link } = req.body;

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

    // Create a new project with the uploaded image URLs
    const newProject = await Project.create({
      title,
      description,
      category,
      yearOfProject,
      Link,
      thumbnail: thumbnailUrl.split("?")[0], // Store thumbnail URL
      images: imageUrls, // Store uploaded image URLs
    });

    res.status(201).json({ success: true, data: newProject });
  } catch (error) {
    console.error('Error in createProject:', error);
    next(error); // Pass error to the error handler middleware
  }
};

// Get all projects
exports.getProjects = async (req, res, next) => {
  try {
    const project = await Project.find();
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    console.error('Error in getProject:', error);
    next(error);
  }
};

// Get a single Project by ID
exports.getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    console.error('Error in getProject:', error);
    next(error);
  }
};


// Update a Project by ID
exports.updateProject = async (req, res, next) => {
  try {
    const { title, description, category, yearOfProject, Link } = req.body;

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    let thumbnailUrl = project.thumbnail;
    let imageUrls = project.images;

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

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, {
      title,
      description,
      category,
      yearOfProject,
      Link,
      thumbnail: thumbnailUrl.split("?")[0],
      images: imageUrls,
    }, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: updatedProject });
  } catch (error) {
    console.error('Error in updateProject:', error);
    next(error);
  }
};

// Delete a Project by ID
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error('Error in deleteProject:', error);
    next(error);
  }
};
