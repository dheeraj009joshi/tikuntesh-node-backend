const express = require('express');
const multer = require('multer');
const upload = multer(); 
const {
  createProject,
  getProject,
  getProjects,
  updateProject,
  deleteProject,
} = require('../../controllers/projectController');

const router = express.Router();

router.route('/')
  .get( getProjects)
  .post(upload.any(),createProject);

router.route('/:id')
  .get(getProject)
  .put(upload.any(),updateProject)
  .delete( deleteProject);



module.exports = router;
