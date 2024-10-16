// routes/studyMaterialRoutes.js
const express = require('express');
const { uploadVideoMaterial, getAllVideoMaterials, getVideoMaterialsByBatch, deleteVideoMaterial } = require('../controllers/video.controller');

const router = express.Router();

// POST route to upload study material
router.post('/add-video', uploadVideoMaterial);
router.get('/get-video', getAllVideoMaterials);
router.delete('/delete-video/:id', deleteVideoMaterial);
router.get('/get-video/:batch_no', getVideoMaterialsByBatch);


module.exports = router;
